import { AbstractParseNode } from "./abstract-parse-node";
import { matchRegEx } from "./parse-node-helpers";

export class IdentifierNode extends AbstractParseNode {

    constructor() {
        super();
        this.placeholder = "name";
    }

    parseText(text: string): void {
        this.remainingText = text;
        if (text.trimStart().length > 0) {
          [this.status, this.matchedText, this.remainingText] = matchRegEx(text, /^\s*[a-z]\w*/);
        }
    }

    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
}