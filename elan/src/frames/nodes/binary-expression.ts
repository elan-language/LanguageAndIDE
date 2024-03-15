import { ExprNode } from "./expr-node";
import { BinOp } from "./bin-op";
import { AbstractSequence } from "./abstract-sequence";
import { VariableNode } from "./variable-node";
import { Term } from "./term";

export class BinaryExpression extends AbstractSequence {
    
    constructor() {
        super();
        this.placeholder = "expression";
    }

    parseText(text: string): void {
        this.elements.push(new Term());
        this.elements.push(new BinOp());
        this.elements.push(new ExprNode());
        return super.parseText(text);
    }
    textAsHtml(): string {
        throw new Error("Method not implemented.");
    }
    textAsSource(): string {
        throw new Error("Method not implemented.");
    }

}