import { AbstractSequence } from "./abstract-sequence";
import { Punctuation } from "./punctuation";
import { CSV } from "./csv";
import { ExprNode } from "./expr-node";

export class TupleDefNode extends AbstractSequence {
    constructor() {
        super();
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            this.elements.push(new Punctuation(`(`));
            this.elements.push(new CSV(() => new ExprNode(),2));
            this.elements.push(new Punctuation(`)`));
            super.parseText(text);
        }
    }
    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
}