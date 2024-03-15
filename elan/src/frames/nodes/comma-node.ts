import { AbstractSequence } from "./abstract-sequence";
import { FixedText } from "./fixed-text";
import { ParseNode } from "./parse-node";

export class CommaNode extends AbstractSequence {
    nodeConstructor: () => ParseNode;

    constructor(nodeConstructor: () => ParseNode) {
        super();
        this.nodeConstructor = nodeConstructor;
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            this.elements.push(new FixedText(","));
            this.elements.push(this.nodeConstructor());
            super.parseText(text);
        }
    }
    textAsHtml(): string {
        throw new Error("Method not implemented.");
    }
    textAsSource(): string {
        throw new Error("Method not implemented.");
    }
}