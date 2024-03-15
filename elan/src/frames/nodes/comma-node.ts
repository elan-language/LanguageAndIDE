import { AbstractSequence } from "./abstract-sequence";
import { AnyTextExceptQuotes } from "./anyTextExceptQuotes";
import { FixedText } from "./fixed-text";
import { ParseNode } from "./parse-node";

export class CommaNode extends AbstractSequence {
    node: ParseNode;

    constructor(node: ParseNode) {
        super();
        this.node = node;
    }

    parseText(text: string): void {
        if (text.length > 0) {
            this.subNodes.push(new FixedText(","));
            this.subNodes.push(this.node);
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