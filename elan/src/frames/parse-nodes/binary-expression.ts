import { ExprNode } from "./expr-node";
import { BinaryOperation } from "./binary-operation";
import { AbstractSequence } from "./abstract-sequence";
import { IdentifierNode } from "./identifier-node";
import { Term } from "./term";

export class BinaryExpression extends AbstractSequence {
    
    constructor() {
        super();
        this.placeholder = "expression";
    }

    parseText(text: string): void {
        this.elements.push(new Term());
        this.elements.push(new BinaryOperation());
        this.elements.push(new ExprNode());
        return super.parseText(text);
    }
    
}