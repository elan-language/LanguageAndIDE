import { AbstractParseNode } from "./abstract-parse-node";
import { matchRegEx } from "./parse-node-helpers";

export class AnyTextExceptQuotes extends AbstractParseNode {

    constructor() {
        super();
        this.placeholder = "integer value";
    }

    parseText(text: string): void {
        this.remainingText = text;
        if (text.trimStart().length > 0) {
            [this.status, this.matchedText, this.remainingText] = matchRegEx(text, /^[^"]*/);
        }
    }

    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
}