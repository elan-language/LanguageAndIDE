// The language-independent code that translates library functions calls
// in expressions in exported code
import { LanguageExport } from "./frame-interfaces/language-export";
import { languageHelper_mathFunctions } from "./language-helpers";

export class LanguageExportHelpers {
  constructor(private readonly languageExport: LanguageExport) {
    // languageExport is of a language-specific class
    // and contains all the lookup tables for the translation.
    // It is stashed away for me in this.languageExport
  }

  // a master flag which turns the expression processing on and off
  // with a single line of code
  private enableExportTranslation = false;

  // a record of which polyfills we need
  private polyfillsUsed: { [f: string]: boolean } = {};

  // A variable to accumulate the imports required by any functions calls we see
  // Each string in the set is an import statement, complete with newline
  // Using a Set to deduplicate
  private importSet = new Set<string>();

  // return the import statements built up during the processing of the file
  renderFileImportsAsHtml(): string {
    let result = Array.from(this.importSet.values()).sort().join("");
    for (const p in this.polyfillsUsed) {
      result += this.languageExport.polyfillTable[p];
    }
    // clear for next time
    this.importSet = new Set<string>();
    this.polyfillsUsed = {};
    // and a blank line if we are returning anything
    return result + (result ? "\n" : "");
  }

  translateExpression(expr: string): string {
    // Change of plan, disable all the expression translation for the moment
    if (!this.enableExportTranslation) {
      return expr;
    }

    // add "math." to math library functions
    const regexp = new RegExp(
      `(<el-method>)(${languageHelper_mathFunctions.join("|")})(</el-method>)`,
      "g",
    );
    // this is effectively a replaceAll because the regexp has the "g" flag
    let result = expr.replace(regexp, this.lookupmath);

    // non-math functions which are dot methods and stay dot methods
    // or standalone and stay standalone
    // ie just a name change required
    result = this.translatePlainMethods(result);

    // extension methods (dot methods) which become standalone functions in Python
    // and the object becomes the argument
    // eg li.length() becomes len(li)
    // or the object becomes the first argument
    // eg num.round(3) becomes round(num, 3)
    result = this.translateExtension(result);

    // standalone functions with parameters which need moving
    result = this.translateStandaloneWithParams(result);

    // language-specific oddities function
    result = this.languageExport.translateOddities(result);
    // Not sure if I should be acting on expr or result.
    // There should be no overlap between any of the Elan or other language names.
    this.registerPolyfills(expr);

    return result;
  }

  // 'this' is undefined inside a traditional function definition
  // when used as a callback from string "replace()"
  // so we use an arrow function so it has access to 'this'
  private lookupmath = (
    _match: string,
    p1: string,
    p2: string,
    p3: string,
    _offset: number,
    _string: string,
  ) => {
    const result =
      this.languageExport.mathExceptions[p2] ?? `${this.languageExport.mathPrefix}.${p2}`;
    // Go and see if any import statement is needed for this function
    // and add it to the set if so.
    // The returned statement includes a final newline unless it is an empty string.
    // If no import is needed, an empty string is returned which is quietly
    // appended to the final output.
    this.importSet.add(this.languageExport.getImportNeeded(result));
    return `${p1}${result}${p3}`;
  };

  // non-math functions which are dot methods and stay dot methods
  // or standalone and stay standalone
  // these just need the name changing, and no import statement is needed
  // could use regexp lookahead and lookbehind to handle the tags
  // but I am doing it the way I know for now
  private translatePlainMethods(expr: string): string {
    return expr.replace(
      new RegExp(
        `(${this.METHOPTAG})(${Object.keys(this.languageExport.plainMethodTable).join("|")})(${this.METHCLTAG})`,
        "g",
      ),
      (_match, p1, p2, p3) => `${p1}${this.languageExport.plainMethodTable[p2]}${p3}`,
    );
  }

  private METHOPTAG = "<el-method>"; // open tag
  private METHCLTAG = "</el-method>"; // close tag

  // we need to distinguish opening and closing quotes
  // we do this by substituting different characters for them
  // while we work out the positions of the strings to be moved around
  // these two characters look a bit like brackets and are unlikely to be entered by users
  // they go into a local variable in translateExtension() and shouldn't leak out!
  private OPENQUOTE = "\u2770"; // HEAVY LEFT-POINTING ANGLE BRACKET ORNAMENT (U+2770)
  private CLOSEQUOTE = "\u2771"; // HEAVY RIGHT-POINTING ANGLE BRACKET ORNAMENT (U+2771)

  // Dot methods which translate to standalone functions
  private translateExtension(expr: string): string {
    let result = expr;
    const regexp = new RegExp(
      `(${this.METHOPTAG})(${Object.keys(this.languageExport.extensionTable).join("|")})(${this.METHCLTAG})`,
      "g",
    );
    let match;
    // We scan through the original line "expr" looking for function names to convert
    // in one pass so that we don't scan the same area twice, in case the name is the same.
    // note assignment to "match" not a comparison
    while ((match = regexp.exec(expr))) {
      // Adjust the match position to take account of the fact that the part
      // before the match may have already changed in length, but the part
      // after the match has not changed.
      // pos2 is the position of the function name (with its tags) in "result".
      const pos2 = match.index + result.length - expr.length;
      const funcName = match[2]; // second set of brackets is the function name
      // convert the quotes so we can distinguish the two ends of a string
      // we take advantage of the fact that a literal string is marked up
      // like this: "<el-lit>my string</el-lit>"
      // just in case a user enters one of these quotes, we remove them first
      // the replacements are the same length (2) as the originals
      // this value is thrown away once we have found the correct positions
      // We also squelch "</" because a division operator is one of the delimiters
      // which marks the end of the object expression
      const working = result
        .replaceAll(this.OPENQUOTE, "z")
        .replaceAll(this.CLOSEQUOTE, "z")
        .replaceAll('"<', this.OPENQUOTE + "<")
        .replaceAll('>"', ">" + this.CLOSEQUOTE)
        .replaceAll("</", "<@");

      // look back for the beginning of the object expression eg obj.length()
      let cont = true;
      let pos1 = pos2;
      while (cont) {
        const c = working[pos1];
        // look for a delimiter
        if (" ([{,*/".includes(c)) {
          // found start of object
          cont = false;
        } else {
          if ((")]" + this.CLOSEQUOTE).includes(c)) {
            // skip to the other end of this string or bracketed expression
            // "-1" tells findmatch to work backwards towards the start of the string
            pos1 = this.findmatch(working, pos1, -1);
          }
          pos1--;
        }
        // TBD need to make findmatch return -1 on running off start of string and catch it
        // throw new Error(`Can't find start of object ending at ${pos2} in /${expr}/`);
        if (pos1 < 0) {
          // reached start of string, that is the start of the object
          cont = false;
        }
      } // while cont
      // pos1 will be -1 if it scanned right back to the start of the string
      // that is OK as we always add 1 to it below
      // move the object to be the argument in the original string
      // the argument may have already been rewritten earlier.
      // the trailing "(" on argsPos is deliberate -- that also has to be removed
      // and is added back before the arguments
      // If there is already an argument add comma and space
      // eg num.round(3) --> round(num, 3)
      // if no args, argsPos points to the closing ")"
      // if args, argsPos points to first char of args
      const argsPos = pos2 + `${this.METHOPTAG}${funcName}${this.METHCLTAG}(`.length;
      const replacement = this.languageExport.extensionTable[funcName];
      // "pos2 - 1" with -1 because we want to throw away the dot
      result =
        result.substring(0, pos1 + 1) + // up to the delimiter
        `${this.METHOPTAG}${replacement}${this.METHCLTAG}(` + // new function name
        result.substring(pos1 + 1, pos2 - 1) + // argument
        (result[argsPos] === ")" ? "" : ", ") + // if there is already an argument add comma
        result.substring(argsPos); // rest of the string
      this.importSet.add(this.languageExport.getImportNeeded(replacement));
    } // while regexp.exec
    return result;
  }

  // lookup table for the finding of matching brackets and quotes
  // it accepts some things which are not legal in Elan
  // dir = 1 = forwards (left to right), dir = -1 = backwards (right to left)
  private matchtable: { [propName: string]: { close: string; nest: string; dir: number } } = {
    "(": { close: ")", nest: this.OPENQUOTE + "([", dir: 1 },
    ")": { close: "(", nest: this.CLOSEQUOTE + ")]", dir: -1 },
    [this.OPENQUOTE]: { close: this.CLOSEQUOTE, nest: this.OPENQUOTE, dir: 1 },
    [this.CLOSEQUOTE]: { close: this.OPENQUOTE, nest: this.CLOSEQUOTE, dir: -1 },
    "[": { close: "]", nest: this.OPENQUOTE + "([", dir: 1 },
    "]": { close: "[", nest: this.CLOSEQUOTE + ")]", dir: -1 },
  };
  // dir = 1 for forwards, -1 for backwards
  private findmatch(text: string, start: number, dir: number): number {
    const lup = this.matchtable[text[start]];
    if (!lup) {
      throw new Error("Bad opening character /" + text[start] + "/");
    }
    // in early versions, some delimiters worked in both directions
    if (lup.dir !== 0 && lup.dir !== dir) {
      throw new Error("Opening character /" + text[start] + "/ doesn't match dir " + dir);
    }
    let index = start + dir;
    while (index >= 0 && index < text.length) {
      const c = text[index];
      if (c === lup.close) {
        return index;
      }
      if (lup.nest.includes(c)) {
        index = this.findmatch(text, index, dir);
        // and continue after the nested element
      }
      // else an ordinary character, take no action
      index += dir;
    }
    // ran off end of string
    throw new Error("No match");
  }

  private translateStandaloneWithParams(expr: string): string {
    // We use the same algorithm more or less as translateExtension
    // (dot methods which translate to standalone functions;
    //  the object in obj.length() moves to the right in the string).
    // The twist is that this time there are arguments which move to the left
    // in the string, and hence we need to find the function calls in reverse order
    // from right to left so that the arguments get translated before the function call.
    // Otherwise it is hard to keep track of where we are in the "result" string.
    // There is no direct mechanism that I can find in JavaScript to run a //g regular expression
    // match from right to left.
    // But we can do it in about 3 extra lines of code by:
    // - reversing the string to be searched
    // - reversing the string from which we construct the regular expression
    // - reversing the matched string after the match
    // - adjusting the returned index, where the string was found
    // this may be a bit inefficient -- it reverses the string repeatedly
    // but most of the time it doesn't find anything so only does it once
    // As this is a one-line function, let's make it local for the moment
    const strRev = (s: string) => [...s].reverse().join("");
    let result = expr;
    // brackets need to be the wrong way round as the string is reversed!
    // reverse the brackets on the fly as easier to debug
    const regexp = new RegExp(
      strRev(
        `(${this.METHOPTAG})(${Object.keys(this.languageExport.standaloneTable).join("|")})(${this.METHCLTAG})`.replace(
          /[()]/g,
          (c) => (c === "(" ? ")" : "("),
        ),
      ),
      "g",
    );
    let match;
    // We scan through the original line "expr" looking for function names to convert
    // in one pass so that we don't scan the same area twice, in case the name is the same.
    // note assignment to "match" not a comparison
    while ((match = regexp.exec(strRev(expr)))) {
      const funcName = strRev(match[2]); // second set of brackets is the function name
      const funcLength = match[0].length; // length of function name with its tags
      // Adjust the match position to take account of the fact that the part
      // after the match may have already changed in length, but the part
      // before the match has not changed.
      // pos2 is the position of the function name (with its tags) in "result".
      const pos2 = expr.length - match.index - funcLength;

      // see previous comment
      // this needs to be a separate function one day
      const working = result
        .replaceAll(this.OPENQUOTE, "z")
        .replaceAll(this.CLOSEQUOTE, "z")
        .replaceAll('"<', this.OPENQUOTE + "<")
        .replaceAll('>"', ">" + this.CLOSEQUOTE)
        .replaceAll("</", "<@");

      // move beyond the bracket following the function name
      const pos1 = pos2 + funcLength + 1;
      // fetch the aguments.  prms is array of strings
      // returns { prms: params, end: index }
      const params = this.getparams(working, pos1);

      // replace the call and the arguments with the replacement string from the table
      // the arguments may have already been rewritten earlier.

      // we don't check that we have the right number of arguments
      // just drop in as many as we have placeholders for

      const replacement = this.languageExport.standaloneTable[funcName];
      // for dot methods eg subString we need to remove the dot
      const dotAdjust = pos2 > 0 && result[pos2 - 1] === "." ? 1 : 0;
      // and now put it all together
      result =
        result.substring(0, pos2 - dotAdjust) + // up to the function name
        replacement.replace(/\$(\d)/g, (_match, p1) =>
          result.substring(params.prms[+p1][0], params.prms[+p1][1]),
        ) + // params in expression
        result.substring(params.end + 1); // rest of the string (+1 for trailing bracket on params)
      this.importSet.add(this.languageExport.getImportNeeded(replacement));
    } // while regexp.exec
    return result;
  }

  // start points to first character of params, after the open bracket
  // returns array of [start, end] positions for the params and the offset of the end
  // can't return the actual strings as we are working on the "working" version
  // with adjusted quotes
  private getparams(text: string, start: number): { prms: number[][]; end: number } {
    const params = []; // not really a constant, it gets elements added
    const lup = { close: ")", nest: this.OPENQUOTE + "([", sep: ",)" };
    let index = start;
    let pstart = index;
    while (index < text.length) {
      const c = text[index];
      if (lup.sep.includes(c)) {
        params.push([pstart, index]);
        pstart = index + 2; // for next param, beyond the comma and space
      }
      if (c === lup.close) {
        return { prms: params, end: index };
      }
      if (lup.nest.includes(c)) {
        index = this.findmatch(text, index, 1);
        // and continue after the nested element
      }
      // else an ordinary character, take no action
      index++;
    }
    // ran off end of string
    throw new Error("Bad param syntax");
  }

  private registerPolyfills(expr: string): void {
    let match;
    const regexp = new RegExp(
      `(${this.METHOPTAG})(${Object.keys(this.languageExport.polyfillTable).join("|")})(${this.METHCLTAG})`,
      "g",
    );
    while ((match = regexp.exec(expr))) {
      const funcName = match[2];
      this.polyfillsUsed[funcName] = true;
    }
  }
}
