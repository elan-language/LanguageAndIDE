import { AbstractParseNode } from "./abstract-parse-node";
import { matchRegEx } from "./parse-node-helpers";

export class RegExMatchNode extends AbstractParseNode {
    regx: RegExp;
    addLeadingSpace: boolean;

    constructor(regx: RegExp, addLeadingSpace = false) {
        super();
        this.regx = regx;
        this.addLeadingSpace = addLeadingSpace;
    }

    parseText(text: string): void {
        this.remainingText = text;
        if (text.trimStart().length > 0) {
          [this.status, this.matchedText, this.remainingText] = matchRegEx(text,this.regx);
        }
    }

    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
    renderAsSource(): string {
        return this.addLeadingSpace ? ` ${this.matchedText}`: this.matchedText;
    }
}