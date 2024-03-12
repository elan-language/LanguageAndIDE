import { AbstractParseNode } from "./abstract-parse-node";
import { matchRegEx } from "./parse-node-helpers";

export class LitChar extends AbstractParseNode {

    constructor() {
        super();
        this.placeholder = "char value";
    }

    parseText(text: string): void {
        if (text.length > 0) {
            [this.status, this.matchedText, this.remainingText] = matchRegEx(text, /^\s*'[\w]'/);
        }
    }

    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
    renderAsSource(): string {
        throw new Error("Method not implemented.");
    }

}