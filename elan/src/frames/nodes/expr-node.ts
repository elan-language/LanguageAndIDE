import { AbstractAlternatives } from "./abstract-alternatives";
import { BinaryExpression } from "./binary-expression";
import { ListOfExpr } from "./listOfExpr";
import { Term } from "./term";
import { TupleDefNode } from "./tuple-def-node";

export class ExprNode extends AbstractAlternatives {
    constructor() {
        super();
        this.placeholder = "expression";
    }

    parseText(text: string): void {
        this.alternatives.push(new Term());
        this.alternatives.push(new BinaryExpression());
        super.parseText(text);
    }
    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
}