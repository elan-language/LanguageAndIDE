import { AbstractFunction } from "./class-members/abstract-function";
import { AbstractProcedure } from "./class-members/abstract-procedure";
import { AbstractProperty } from "./class-members/abstract-property";
import { Constructor } from "./class-members/constructor";
import { FunctionMethod } from "./class-members/function-method";
import { ProcedureMethod } from "./class-members/procedure-method";
import { Property } from "./class-members/property";
import { WithMethod } from "./class-members/with-method";
import { ParamListField } from "./fields/param-list-field";
import { selfTypeAsHtml } from "./frame-helpers";
import { Field } from "./frame-interfaces/field";
import { Frame } from "./frame-interfaces/frame";
import { Language } from "./frame-interfaces/language";
import { MemberFrame } from "./frame-interfaces/member-frame";
import { AbstractClass } from "./globals/abstract-class";
import { ClassFrame } from "./globals/class-frame";
import { ConcreteClass } from "./globals/concrete-class";
import { ConstantGlobal } from "./globals/constant-global";
import { Enum } from "./globals/enum";
import { FunctionFrame } from "./globals/function-frame";
import { GlobalComment } from "./globals/global-comment";
import { GlobalFunction } from "./globals/global-function";
import { GlobalProcedure } from "./globals/global-procedure";
import { InterfaceFrame } from "./globals/interface-frame";
import { MainFrame } from "./globals/main-frame";
import { ProcedureFrame } from "./globals/procedure-frame";
import { TestFrame } from "./globals/test-frame";
import { LanguageAbstract } from "./language-abstract";
import { languageHelper_mathFunctions } from "./language-helpers";
import { CSV } from "./parse-nodes/csv";
import { IdentifierDef } from "./parse-nodes/identifier-def";
import { ListNode } from "./parse-nodes/list-node";
import { LitStringInterpolated } from "./parse-nodes/lit-string-interpolated";
import { NewInstance } from "./parse-nodes/new-instance";
import { ParamDefNode } from "./parse-nodes/param-def-node";
import { Space } from "./parse-nodes/parse-node-helpers";
import { PunctuationNode } from "./parse-nodes/punctuation-node";
import { SpaceNode } from "./parse-nodes/space-node";
import { TypeGenericNode } from "./parse-nodes/type-generic-node";
import { TypeNameQualifiedNode } from "./parse-nodes/type-name-qualified-node";
import { TypeNode } from "./parse-nodes/type-node";
import { TypeTupleNode } from "./parse-nodes/type-tuple-node";
import { AssertStatement } from "./statements/assert-statement";
import { CallStatement } from "./statements/call-statement";
import { CatchStatement } from "./statements/catch-statement";
import { CommentStatement } from "./statements/comment-statement";
import { Elif } from "./statements/elif";
import { Else } from "./statements/else";
import { For } from "./statements/for";
import { IfStatement } from "./statements/if-statement";
import { LetStatement } from "./statements/let-statement";
import { ReturnStatement } from "./statements/return-statement";
import { SetStatement } from "./statements/set-statement";
import { Throw } from "./statements/throw";
import { TryStatement } from "./statements/try";
import { VariableStatement } from "./statements/variable-statement";
import { While } from "./statements/while";
import { WithPropertyUpdate } from "./statements/with-property-update";
import { ParseStatus } from "./status-enums";
import { TokenType } from "./symbol-completion-helpers";
import { CLOSE_SQ_BRACKET, COLON, OPEN_SQ_BRACKET } from "./symbols";

export class LanguagePython extends LanguageAbstract {
  static Instance: Language = new LanguagePython();

  commentRegex(): RegExp {
    return /# [^\r\n]*/;
  }
  languageHtmlClass = "python";
  languageFullName: string = "Python";
  defaultFileExtension: string = "py";
  defaultMimeType: string = "text/x-python";

  annotation(frame: Frame): string {
    let annotation = "";
    if (
      frame instanceof VariableStatement ||
      frame instanceof ConstantGlobal ||
      frame instanceof LetStatement ||
      frame instanceof FunctionFrame ||
      frame instanceof ProcedureFrame ||
      frame instanceof CallStatement ||
      frame instanceof SetStatement ||
      frame instanceof CatchStatement ||
      frame instanceof Property ||
      frame instanceof FunctionMethod ||
      frame instanceof ProcedureMethod ||
      frame instanceof WithMethod ||
      frame instanceof WithPropertyUpdate ||
      frame instanceof AbstractFunction ||
      frame instanceof AbstractProcedure ||
      frame instanceof AbstractProperty
    ) {
      annotation = frame.frameSpecificAnnotation();
    }
    return annotation;
  }

  renderSingleLineAsHtml(frame: Frame): string {
    let html = `Html not specified for ${typeof frame}`;
    if (frame instanceof AbstractFunction) {
      html = `<el-comment>@abstractmethod</el-comment><br>
<el-kw>${this.DEF} </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()}) -> ${frame.returnType.renderAsHtml()}:<br>
&nbsp;&nbsp;<el-kw>pass</el-kw>`;
    } else if (frame instanceof AbstractProcedure) {
      html = `<el-comment>@abstractmethod</el-comment><br>
<el-kw>${this.DEF} </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()}) -> <el-kw>${this.NONE}</el-kw><br>
&nbsp;&nbsp;<el-kw>pass</el-kw>`;
    } else if (frame instanceof AbstractProperty) {
      html = html = `<el-comment>@property</el-comment><br>
<el-comment>@abstractmethod</el-comment><br>
<el-kw>${this.DEF} </el-kw>${frame.name.renderAsHtml()}(<el-kw>${this.SELF}</el-kw>: ${selfTypeAsHtml(frame)}) -> ${frame.type.renderAsHtml()}:<br>
&nbsp;&nbsp;<el-kw>pass</el-kw>`;
    } else if (frame instanceof AssertStatement) {
      html = `<el-kw>self</el-kw>.<el-method>assertEqual</el-method>(${frame.actual.renderAsHtml()}, ${frame.expected.renderAsHtml()})`;
    } else if (frame instanceof CallStatement) {
      html = `${frame.proc.renderAsHtml()}(${frame.args.renderAsHtml()})`;
    } else if (frame instanceof CatchStatement) {
      html = `<el-kw>${this.EXCEPT}</el-kw> ${frame.exceptionType.renderAsHtml()}:`;
    } else if (frame instanceof CommentStatement) {
      html = `<el-kw>${this.COMMENT_MARKER} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof ConstantGlobal) {
      html = `${frame.name.renderAsHtml()} = ${frame.value.renderAsHtml()}`;
    } else if (frame instanceof Elif) {
      html = `<el-kw>${this.ELIF} </el-kw>${frame.condition.renderAsHtml()}:`;
    } else if (frame instanceof Else) {
      html = `<el-kw>${this.ELSE}</el-kw>:`;
    } else if (frame instanceof Enum) {
      this.importEnum = true;
      html = `${frame.name.renderAsHtml()} = <el-type>Enum</el-type>('${frame.name.renderAsHtml()}', '${frame.values.renderAsHtml()}')`;
    } else if (frame instanceof GlobalComment) {
      html = `<el-kw>${this.COMMENT_MARKER} </el-kw>${frame.text.renderAsHtml()}`;
    } else if (frame instanceof LetStatement) {
      html = `${frame.name.renderAsHtml()} = ${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Property) {
      html = `${frame.name.renderAsHtml()}: ${frame.type.renderAsHtml()}`;
    } else if (frame instanceof ReturnStatement) {
      html = `<el-kw>${this.RETURN} </el-kw>${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof SetStatement) {
      html = `${frame.assignable.renderAsHtml()} = ${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof Throw) {
      html = `<el-kw>${this.RAISE}</el-kw> ${frame.type.renderAsHtml()}("${frame.text.renderAsHtml()}")`;
    } else if (frame instanceof VariableStatement) {
      html = `${frame.name.renderAsHtml()} = ${frame.expr.renderAsHtml()}`;
    } else if (frame instanceof WithPropertyUpdate) {
      html = `${frame.assignable.renderAsHtml()} = ${frame.expr.renderAsHtml()}`;
    } 
    return html;
  }

  renderTopAsHtml(frame: Frame): string {
    let html = `Html not specified for ${typeof frame}`;
    if (frame instanceof AbstractClass) {
      html = `<el-kw>${this.CLASS} </el-kw><el-type>${frame.name.renderAsHtml()}</el-type>${this.abstractInheritance(frame)}`;
    } else if (frame instanceof ConcreteClass) {
      const inheritance = frame.doesInherit()
        ? `(${frame.inheritance.renderAsHtml()})`
        : `${frame.inheritance.renderAsHtml()}`;
      html = `<el-kw>${this.CLASS} </el-kw><el-type>${frame.name.renderAsHtml()}</el-type>${inheritance}`;
    } else if (frame instanceof Constructor) {
      html = `<el-kw>${this.DEF}</el-kw> <el-method>__init__</el-method>(${this.paramsListAsHtml(frame, frame.params)}) -> <el-kw>None</el-kw>:`;
    } else if (frame instanceof For) {
      html = `<el-kw>${this.FOR} </el-kw>${frame.variable.renderAsHtml()}<el-kw> ${this.IN} </el-kw>${frame.iter.renderAsHtml()}:`;
    } else if (frame instanceof Enum) {
      html = ``;
    } else if (frame instanceof FunctionMethod || frame instanceof WithMethod) {
      html = `<el-kw>${this.DEF} </el-kw>${frame.name.renderAsHtml()}(${this.paramsListAsHtml(frame, frame.params)}) -> ${frame.returnType.renderAsHtml()}:`;
    } else if (frame instanceof GlobalFunction) {
      html = `<el-kw>${this.DEF} </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()}) -> ${frame.returnType.renderAsHtml()}:`;
    } else if (frame instanceof GlobalProcedure) {
      html = `<el-kw>${this.DEF} </el-kw>${frame.name.renderAsHtml()}(${frame.params.renderAsHtml()}) -> <el-kw>${this.NONE}</el-kw>:`;
    } else if (frame instanceof IfStatement) {
      html = `<el-kw>${this.IF} </el-kw>${frame.condition.renderAsHtml()}:`;
    } else if (frame instanceof InterfaceFrame) {
      html = `<el-kw>${this.CLASS} </el-kw><el-type>${frame.name.renderAsHtml()}</el-type>${this.abstractInheritance(frame)}`;
    } else if (frame instanceof MainFrame) {
      this.importEnum = false;
      this.importMath = false; // reset at start of file
      this.polyfillsUsed = {};
      html = `<el-kw>${this.DEF} </el-kw><el-method>main</el-method>() -> <el-kw>${this.NONE}</el-kw>:`;
    } else if (frame instanceof ProcedureMethod) {
      html = `<el-kw>${this.DEF} </el-kw>${frame.name.renderAsHtml()}(${this.paramsListAsHtml(frame, frame.params)}) -> <el-kw>${this.NONE}</el-kw>:`;
    } else if (frame instanceof Property) {
      html = ``;
    } else if (frame instanceof TestFrame) {
      html = `<el-kw>${this.DEF}</el-kw> <el-method>${frame.testName.renderAsHtml()}</el-method>(<el-kw>${this.SELF}</el-kw>) -> <el-kw>${this.NONE}:`;
    } else if (frame instanceof TryStatement) {
      html = `<el-kw>${this.TRY}</el-kw>:`;
    } else if (frame instanceof While) {
      html = `<el-kw>${this.WHILE} </el-kw>${frame.condition.renderAsHtml()}:`;
    }
    return html;
  }

  abstractInheritance(frame: ClassFrame): string {
    const inheritance = frame.inheritance.renderAsHtml();
    return frame.doesInherit()
      ? `(<el-type>ABC</el-type>, ${inheritance})`
      : frame.isSelected()
        ? `(<el-type>ABC</el-type>${inheritance})`
        : `(<el-type>ABC</el-type>)`;
  }

  paramsListAsHtml(frame: MemberFrame, field: ParamListField): string {
    const self: string = `<el-kw>${this.SELF}</el-kw>: ${selfTypeAsHtml(frame)}`;
    return field.text === "" ? self : `${self}, ${field.renderAsHtml()}`;
  }

  renderBottomAsHtml(_frame: Frame): string {
    return ""; // Python blocks have no textual ending;
  }

  renderFileImportsAsHtml(): string {
    // Change of plan, disable all imports for the moment too
    return "";

    // no HTML needed here as it is actually only used for export
    let result = "";
    result += this.importEnum ? "import enum\n" : "";
    result += this.importMath ? "import math\n" : "";
    // blank line only if we have any imports
    result += this.importEnum || this.importMath ? "\n" : "";
    let extra = "";
    for (const p in this.polyfillsUsed) {
      result += this.polyfillTable[p];
      extra = "\n"; // extra newline if we have any polyfills here
    }
    return result + extra;
  }

  renderFileTrailerAsHtml(): string {
    return "\n\n<el-method>main</el-method>()";
  }

  translateExpression(expr: string): string {
    // Change of plan, disable all the expression translation for the moment
    return expr;

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

    result = this.translateOddities(result);
    // Not sure if I should be acting on expr or result.
    // There should be no overlap between any of the Elan or Python names.
    this.registerPolyfills(expr);

    return result;
  }

  private importEnum = false;
  private importMath = false;
  private mathExceptions: { [propName: string]: string } = {
    pow: "pow",
    abs: "abs",
    logE: "math.log",
  };
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
    const result = this.mathExceptions[p2] ?? `math.${p2}`;
    if (result.startsWith("math.")) {
      this.importMath = true;
    }
    return `${p1}${result}${p3}`;
  };

  private plainMethodTable: { [propName: string]: string } = {
    unicode: "chr",
    rangeInSteps: "range",
    indexOf: "find", // "index" raises an exception on not found
    upperCase: "upper",
    lowerCase: "lower",
    trim: "strip",
  };
  // omitting split: "split" as the name is the same

  // non-math functions which are dot methods and stay dot methods
  // or stanalone and stay standalone
  // these just need the name changing, and no import statement is needed
  // could use regexp lookahead and lookbehind to handle the tags
  // but I am doing it the way I know for now
  private translatePlainMethods(expr: string): string {
    return expr.replace(
      new RegExp(
        `(${this.METHOPTAG})(${Object.keys(this.plainMethodTable).join("|")})(${this.METHCLTAG})`,
        "g",
      ),
      (_match, p1, p2, p3) => `${p1}${this.plainMethodTable[p2]}${p3}`,
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
  private extensionTable: { [propName: string]: string } = {
    toString: "str",
    asUnicode: "ord",
    length: "len",
    floor: "math.floor",
    ceiling: "math.ceil",
    isNaN: "math.isnan",
    isInfinite: "math.isinf",
    round: "round",
    withAppend: "withAppendPy", // adjusted in a later pass
  };

  // Dot methods which translate to standalone functions
  private translateExtension(expr: string): string {
    let result = expr;
    const regexp = new RegExp(
      `(${this.METHOPTAG})(${Object.keys(this.extensionTable).join("|")})(${this.METHCLTAG})`,
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
      const replacement = this.extensionTable[funcName];
      // "pos2 - 1" with -1 because we want to throw away the dot
      result =
        result.substring(0, pos1 + 1) + // up to the delimiter
        `${this.METHOPTAG}${replacement}${this.METHCLTAG}(` + // new function name
        result.substring(pos1 + 1, pos2 - 1) + // argument
        (result[argsPos] === ")" ? "" : ", ") + // if there is already an argument add comma
        result.substring(argsPos); // rest of the string
      if (replacement.startsWith("math.")) {
        this.importMath = true;
      }
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

  // Table for functions with parameters that need moving
  // Add brackets round the whole expression
  // if there may be a higher-priority operator adjacent
  private standaloneTable: { [propName: string]: string } = {
    // there is no confusion with "if" statements
    // as this code is only run for expressions
    if: "($1 if $0 else $2)",
    divAsInt: "math.floor(($0)/($1))",
    divAsFloat: "(($0)/($1))",
    createList: "[$1 for n in range($0)]",
    bitAnd: "(($0) & ($1))",
    bitOr: "($0 | $1)",
    bitXor: "($0 ^ $1)",
    bitNot: "(~$0)",
    bitShiftL: "($0 &lt;&lt; $1)",
    bitShiftR: "(($0 & (1&lt;&lt;32)-1) &gt;&gt; $1)",
    // copy TBD
    subString: "[$0:$1]",
    printNoLine: "print($0, end='')",
    withAppendPy: "($0 + [($1)])", // list + [value]
  };

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
    // brackets the wrong way round as the string is reversed!
    // easier to debug if I changed the brackets on the fly
    const regexp = new RegExp(
      strRev(
        `)${this.METHOPTAG}()${Object.keys(this.standaloneTable).join("|")}()${this.METHCLTAG}(`,
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

      const replacement = this.standaloneTable[funcName];
      // for dot methods eg subString we need to remove the dot
      const dotAdjust = pos2 > 0 && result[pos2 - 1] === "." ? 1 : 0;
      // and now put it all together
      result =
        result.substring(0, pos2 - dotAdjust) + // up to the function name
        replacement.replace(/\$(\d)/g, (_match, p1) =>
          result.substring(params.prms[+p1][0], params.prms[+p1][1]),
        ) + // params in expression
        result.substring(params.end + 1); // rest of the string (+1 for trailing bracket on params)
      if (replacement.startsWith("math.")) {
        this.importMath = true;
      }
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

  private polyfillTable: { [propName: string]: string } = {
    clock: `import time
def clock():
  return int(time.time()*1000)
`,
    parseAsInt: `def parseAsInt(s):
  try:
    n = int(s)
  except ValueError:
    return (False, 0)
  return (True, n)
`,
  };

  private polyfillsUsed: { [f: string]: boolean } = {};

  private registerPolyfills(expr: string): void {
    let match;
    const regexp = new RegExp(
      `(${this.METHOPTAG})(${Object.keys(this.polyfillTable).join("|")})(${this.METHCLTAG})`,
      "g",
    );
    while ((match = regexp.exec(expr))) {
      const funcName = match[2];
      this.polyfillsUsed[funcName] = true;
    }
  }

  private translateOddities(expr: string): string {
    // the items in a tuple
    let result = expr.replace(/\.<el-id>item_(\d)<\/el-id>/g, "[$1]");

    // .equals --> ' == '
    // this can be table-driven one day
    // note leading dot included in string to replace
    // we keep the brackets round the right hand side in case it is an expression
    // with an operator with lower priority than "==", though there are not many
    result = result.replace(
      new RegExp(`.(${this.METHOPTAG})(equals)(${this.METHCLTAG})`, "g"),
      (_match, _p1, _p2, _p3) => ` == `,
    );
    return result;
  }

  private DEF = "def";
  private CLASS = "class";
  private ELIF = "elif";
  private ELSE = "else";
  private EXCEPT = "except";
  private FOR = "for";
  private IF = "if";
  private IN = "in";
  private LAMBDA = "lambda";
  private NONE = "None";
  private RAISE = "raise";
  private RETURN = "return";
  private SELF = "self";
  private TRY = "try";
  private WHILE = "while";

  private OPEN_SQUARE_BRACKET = "[";
  private CLOSE_SQUARE_BRACKET = "]";

  MOD: string = "%";
  EQUAL: string = "==";
  NOT_EQUAL: string = "!=";
  AND: string = "and";
  OR: string = "or";
  NOT: string = "not";

  COMMENT_MARKER = "#";
  LIST_START: string = "[";
  LIST_END: string = "]";
  INTERPOLATED_STRING_PREFIX: string = "f";
  NEW_INSTANCE_PREFIX = ""; // i.e. there is no Python equivalent to 'new' keyword

  INT_NAME: string = "int";
  FLOAT_NAME: string = "float";
  BOOL_NAME: string = "bool";
  STRING_NAME: string = "str";
  LIST_NAME: string = "list";

  TRUE: string = "True";
  FALSE: string = "False";
  BINARY_PREFIX: string = "0b";
  HEX_PREFIX: string = "0x";

  START_OF_GENERIC: string = "[";
  THIS_INSTANCE: string = this.SELF;
  OVERRIDES = "";
  IMPLEMENTS = "";

  EXPRESSION_KEYWORDS: string[] = [this.LAMBDA, this.SELF, this.NOT];

  addNodesForParamDef(node: ParamDefNode): void {
    node.name = new IdentifierDef(node.file);
    node.addElement(node.name);
    node.addElement(new PunctuationNode(node.file, COLON));
    node.addElement(new SpaceNode(node.file, Space.required));
    node.type = new TypeNode(
      node.file,
      new Set<TokenType>([
        TokenType.type_concrete,
        TokenType.type_abstract,
        TokenType.type_notInheritable,
      ]),
    );
    node.addElement(node.type);
  }

  paramDefAsHtml(node: ParamDefNode): string {
    return `${node.name?.renderAsHtml()}: ${node.type?.renderAsHtml()}`;
  }

  newInstanceAsHtml(node: NewInstance): string {
    return node.status === ParseStatus.valid
      ? `${node.type?.renderAsHtml()}(${node.args?.renderAsHtml()})`
      : node.matchedText;
  }

  addNodesForTypeGeneric(node: TypeGenericNode) {
    node.qualifiedName = new TypeNameQualifiedNode(node.file, node.tokenTypes);
    const typeConstr = () => new TypeNode(node.file, node.concreteAndAbstract);
    node.genericTypes = new CSV(node.file, typeConstr, 1);
    node.addElement(node.qualifiedName!);
    node.addElement(new PunctuationNode(node.file, this.OPEN_SQUARE_BRACKET));
    node.addElement(node.genericTypes);
    node.addElement(new PunctuationNode(node.file, this.CLOSE_SQUARE_BRACKET));
  }
  typeGenericAsHtml(node: TypeGenericNode): string {
    return `${node.qualifiedName?.renderAsHtml()}[${node.genericTypes?.renderAsHtml()}]`;
  }

  addNodesForNewInstance(node: NewInstance): void {
    this.addCommonElementsForNewInstance(node);
  }

  listNodeAsHtml(node: ListNode): string {
    return `[${node.csv?.renderAsHtml()}]`;
  }

  litStringInterpolatedAsHtml(node: LitStringInterpolated): string {
    return this.default_litStringInterpolatedAsHtml(node);
  }
  standardiseInterpolatedString(node: LitStringInterpolated, text: string): string {
    return this.default_standardiseInterpolatedString(node, text);
  }

  addNodesForTypeTuple(node: TypeTupleNode): void {
    node.types = new CSV(
      node.file,
      () =>
        new TypeNode(
          node.file,
          new Set<TokenType>([
            TokenType.type_concrete,
            TokenType.type_abstract,
            TokenType.type_notInheritable,
          ]),
        ),
      2,
    );
    node.addElement(new PunctuationNode(node.file, "tuple"));
    node.addElement(new PunctuationNode(node.file, OPEN_SQ_BRACKET));
    node.addElement(node.types);
    node.addElement(new PunctuationNode(node.file, CLOSE_SQ_BRACKET));
  }

  override typeTupleAsHtml(node: TypeTupleNode): string {
    return `<el-kw>tuple</el-kw>[${node.types?.renderAsHtml()}]`;
  }

  functionFrameFields(frame: FunctionFrame): Field[] {
    return this.default_functionFrameFields(frame);
  }

  assertStatementFields(frame: AssertStatement): Field[] {
    return this.default_assertStatementFields(frame);
  }

  reservedWords: Set<string> = new Set<string>([
    `false`,
    `await`,
    `else`,
    `import`,
    `pass`,
    `none`,
    `break`,
    `except`,
    `in`,
    `raise`,
    `true`,
    `class`,
    `finally`,
    `is`,
    `return`,
    `and`,
    `continue`,
    `for`,
    `lambda`,
    `try`,
    `as`,
    `def`,
    `from`,
    `nonlocal`,
    `while`,
    `assert`,
    `del`,
    `global`,
    `not`,
    `with`,
    `async`,
    `elif`,
    `if`,
    `or`,
    `yield`,
    `str`,
    `int`,
    `float`,
    `complex`,
    `list`,
    `tuple`,
    `range`,
    `dict`,
    `set`,
    `frozenset`,
    `bool`,
    `bytes`,
    `bytearray`,
    `memoryview`,
    `nonetype`,
  ]);
}
