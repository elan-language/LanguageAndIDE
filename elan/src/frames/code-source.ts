import { Regexes } from "./fields/regexes";

export interface CodeSource {
    pushBackOntoFrontOfCode(push: string): void;
    removeNewLine(): CodeSource;
    removeIndent(): CodeSource;
    isMatch(code: string): boolean;
    isMatchRegEx(regx: RegExp): boolean;
    remove(code: string): CodeSource;
    removeRegEx(regx: RegExp, optionally: boolean): string;
    hasMoreCode(): boolean;
    getRemainingCode(): string;
    peekNextChar(): string;

    readToEndOfLine(): string;
    readUpToFirstMatch(regx: RegExp): string;
    readToNonMatchingCloseBracket(): string;
}

export class CodeSourceFromString implements CodeSource {
    private remainingCode: string;

    constructor(code: string) {
        this.remainingCode = code;
    }

    pushBackOntoFrontOfCode(pushBack: string): void {
        this.remainingCode = pushBack + this.remainingCode;
    }
    removeNewLine(): CodeSource {
        this.removeRegEx(Regexes.startsWithNewLine, false);
        return this;
    }
    removeIndent(): CodeSource {
        var indent = /^\s*/;
        this.removeRegEx(indent, false);
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
            if (optional){
                return "";
            } else {
                throw new Error(`${this.readToEndOfLine()} does not match ${regx}`);
            }
        } else {
            var match = this.remainingCode.match(regx)![0];
            this.remainingCode = this.remainingCode.replace(regx,"");
            return match;
        }
    }
    isMatch(code: string): boolean {
        return this.remainingCode.startsWith(code);
    }
    isMatchRegEx(regEx: RegExp): boolean {
        var matches = this.remainingCode.match(regEx);
        return matches !== null && matches.length > 0;
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
        return this.removeRegEx(new RegExp(`^[^\r\n]*`),false);
    }
    readUpToFirstMatch(regx: RegExp): string {
        var matchIndex = regx.exec(this.remainingCode)?.index;
        var uptoMatch =  this.remainingCode.substring(0, matchIndex);
        this.remainingCode = this.remainingCode.slice(matchIndex);
        return uptoMatch;
    }
    readToNonMatchingCloseBracket(): string {
        var insideDoubleQuotes = false;
        var insideSingleQuotes = false;
        var openBracketCount = 0;
        var cont = true;
        var result = "";
        while (cont) {
            var c = this.peekNextChar();
            if (insideDoubleQuotes) {   
                if (c === `"`) {
                    insideDoubleQuotes = false;
                } 
            } else if (insideSingleQuotes) {
                if (c === `'`) {
                    insideSingleQuotes = false;
                } 
            }else  if (c === `"`) {
                insideDoubleQuotes = true;
            } else if (c === `'`) {
                insideSingleQuotes = true;
            } else if (c ==='(') { 
                openBracketCount ++;
            } else if (c ===')') { 
                if (openBracketCount === 0) {
                    cont = false;
                } else {
                    openBracketCount --;
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
