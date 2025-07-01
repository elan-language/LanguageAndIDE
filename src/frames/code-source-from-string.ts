import { Regexes } from "./fields/regexes";
import { CodeSource } from "./frame-interfaces/code-source";

export class CodeSourceFromString implements CodeSource {
  private remainingCode: string;

  constructor(code: string) {
    this.remainingCode = code;
  }

  pushBackOntoFrontOfCode(pushBack: string): void {
    this.remainingCode = pushBack + this.remainingCode;
  }
  removeNewLine(): CodeSource {
    this.removeRegEx(Regexes.newLine, false);
    return this;
  }
  removeIndent(): CodeSource {
    this.removeRegEx(Regexes.indent, false);
    return this;
  }
  remove(match: string): CodeSource {
    if (!this.isMatch(match)) {
      throw new Error(`${this.readToEndOfLine()} does not match ${match}`);
    }
    this.remainingCode = this.remainingCode.substring(match.length);
    return this;
  }
  removeRegEx(regx: RegExp, optional: boolean): string {
    if (!this.isMatchRegEx(regx)) {
      if (optional) {
        return "";
      } else {
        throw new Error(`${this.readToEndOfLine()} does not match ${regx}`);
      }
    } else {
      const match = this.remainingCode.match(regx)![0];
      this.remainingCode = this.remainingCode.replace(regx, "");
      return match;
    }
  }
  isMatch(code: string): boolean {
    return this.remainingCode.startsWith(code);
  }
  isMatchRegEx(regEx: RegExp): boolean {
    return regEx.test(this.remainingCode);
  }
  hasMoreCode(): boolean {
    return this.remainingCode.length > 0;
  }
  getRemainingCode(): string {
    return this.remainingCode;
  }
  peekNextChar(): string {
    return this.remainingCode[0];
  }
  readToEndOfLine(): string {
    return this.removeRegEx(Regexes.anythingToNewLineAsRegExp, false);
  }
  readUntil(regx: RegExp): string {
    const matchIndex = regx.exec(this.remainingCode)?.index;
    const uptoMatch = this.remainingCode.substring(0, matchIndex);
    this.remainingCode = this.remainingCode.slice(matchIndex);
    return uptoMatch;
  }
  readMatching(regx: RegExp): string {
    return this.removeRegEx(regx, true);
  }
  readToNonMatchingCloseBracket(): string {
    let insideDoubleQuotes = false;
    let insideSingleQuotes = false;
    let openBracketCount = 0;
    let cont = true;
    let result = "";
    while (cont) {
      const c = this.peekNextChar();
      if (insideDoubleQuotes) {
        if (c === `"`) {
          insideDoubleQuotes = false;
        }
      } else if (insideSingleQuotes) {
        if (c === `'`) {
          insideSingleQuotes = false;
        }
      } else if (c === `"`) {
        insideDoubleQuotes = true;
      } else if (c === `'`) {
        insideSingleQuotes = true;
      } else if (c === "(") {
        openBracketCount++;
      } else if (c === ")") {
        if (openBracketCount === 0) {
          cont = false;
        } else {
          openBracketCount--;
        }
      }
      if (cont) {
        result += c;
        this.remove(c);
      }
    }
    return result;
  }
}
