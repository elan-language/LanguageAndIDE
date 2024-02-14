
export interface CodeSource {
    removeNewLine(): void;
    removeIndent(): void;
    isMatch(code: string): boolean;
    isMatchRegEx(regx: RegExp): boolean;
    remove(code: string): void;
    removeRegEx(regx: RegExp, optionally: boolean): string;
    hasMoreCode(): boolean;
    getRemainingCode(): string;
}

export class CodeSourceFromString implements CodeSource {
    private remainingCode: string;

    constructor(code: string) {
        this.remainingCode = code;
    }
    removeNewLine(): void {
        var newLine = "\n";
        this.remove(newLine);
    }
    removeIndent(): void {
        var indent = /^\s*/;
        this.removeRegEx(indent, false);
    }
    remove(match: string): void {
        if (!this.isMatch(match)) {
            throw new Error(`code does not match ${match} - can check by calling 'isMatch' first`);
        }
        this.remainingCode = this.remainingCode.substring(match.length);
    }
    removeRegEx(regx: RegExp, optional: boolean): string {
        if (!this.isMatchRegEx(regx)) {
            if (optional){
                return "";
            } else {
                throw new Error(`Code does not match ${regx}`);
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
}
