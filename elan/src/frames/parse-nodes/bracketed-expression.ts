import { ExprNode } from "./expr-node";
import { AbstractSequence } from "./abstract-sequence";
import { Symbol } from "./symbol";

export class BracketedExpression extends AbstractSequence {
    
    constructor() {
        super();
        this.placeholder = "";
    }

    parseText(text: string): void {
        if (text.trimStart().length > 0) {
            this.elements.push(new Symbol("("));
            this.elements.push(new ExprNode());
            this.elements.push(new Symbol(")"));
            super.parseText(text);
        }
    }
    
}