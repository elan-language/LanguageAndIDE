import { AbstractParseNode } from "./abstract-parse-node";
import { matchRegEx } from "./parse-node-helpers";

export class LitChar extends AbstractParseNode {

    constructor() {
        super();
        this.placeholder = "string value";
    }

    parseText(text: string): void {
        if (text.length > 0) {
            [this.status, this.matchedText, this.remainingText] = matchRegEx(text, /^\s*"(\w\s)*"/);
        }
    }

    textAsHtml(): string {
        throw new Error("Method not implemented.");
    }
    textAsSource(): string {
        throw new Error("Method not implemented.");
    }

}