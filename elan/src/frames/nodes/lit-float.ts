import { AbstractSequence } from "./abstract-sequence";
import { Punctuation } from "./punctuation";
import { LitInt } from "./lit-int";
import { singleLeadingSpace } from "./node-helpers";
import { RegExMatchNode } from "./regex-match-node";

export class LitFloat extends AbstractSequence {

    constructor() {
        super();
        this.placeholder = "float value";
    }

    parseText(text: string): void {
        this.remainingText = text;
        if (text.trimStart().length > 0) {
            this.elements.push(new LitInt());
            this.elements.push(new Punctuation("."));
            this.elements.push(new RegExMatchNode(/^\s*[0-9]+/));
            super.parseText(text);
        } 
    }

    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
}