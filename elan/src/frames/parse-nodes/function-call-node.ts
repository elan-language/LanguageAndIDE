import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { ExprNode } from "./expr-node";
import { Symbol } from "./symbol";
import { IdentifierNode } from "./identifier-node";

export class FunctionCallNode extends AbstractSequence {
    constructor() {
        super();
    }
    parseText(text: string): void {
        this.remainingText = text;
        if (text.trimStart().length > 0) {
            this.elements.push(new IdentifierNode());
            this.elements.push(new Symbol("("));
            this.elements.push(new CSV(() => new ExprNode(),0)); //arg list
            this.elements.push(new Symbol(")"));
            super.parseText(text);
        }
    }
    
}