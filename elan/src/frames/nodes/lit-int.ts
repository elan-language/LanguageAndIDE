import { AbstractParseNode } from "./abstract-parse-node";
import { matchRegEx } from "./parse-node-helpers";

export class LitInt extends AbstractParseNode {

    constructor() {
        super();
        this.placeholder = "integer value";
    }

    parseText(text: string): void {
        this.remainingText = text;
        if (text.trimStart().length > 0) {
            [this.status, this.matchedText, this.remainingText] = matchRegEx(text, /^\s*[0-9]+/);
        }
    }

    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
}