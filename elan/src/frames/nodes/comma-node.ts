import { AbstractSequence } from "./abstract-sequence";
import { Punctuation } from "./punctuation";
import { ParseNode } from "./parse-node";

export class CommaNode extends AbstractSequence {
    nodeConstructor: () => ParseNode;

    constructor(nodeConstructor: () => ParseNode) {
        super();
        this.nodeConstructor = nodeConstructor;
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            this.elements.push(new Punctuation(","));
            this.elements.push(this.nodeConstructor());
            super.parseText(text);
        }
    }
    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
}