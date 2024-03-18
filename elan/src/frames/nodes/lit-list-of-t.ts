import { AbstractSequence } from "./abstract-sequence";
import { Punctuation } from "./punctuation";
import { CSV } from "./csv";
import { ParseNode } from "./parse-node";

export class LitListOfT extends AbstractSequence {
    elementConstructor: () => ParseNode;

    constructor(elementConstructor: () => ParseNode) {
        super();
        this.elementConstructor = elementConstructor;
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            this.elements.push(new Punctuation(`{`));
            this.elements.push(new CSV(this.elementConstructor,0));
            this.elements.push(new Punctuation(`}`));
            super.parseText(text);
        }
    }
    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
}