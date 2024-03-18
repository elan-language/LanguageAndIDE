import { ExprNode } from "./expr-node";
import { AbstractSequence } from "./abstract-sequence";
import { Punctuation } from "./punctuation";

export class BracketedExpression extends AbstractSequence {
    
    constructor() {
        super();
        this.placeholder = "";
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            this.elements.push(new Punctuation("("));
            this.elements.push(new ExprNode());
            this.elements.push(new Punctuation(")"));
            super.parseText(text);
        }
    }
    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
}