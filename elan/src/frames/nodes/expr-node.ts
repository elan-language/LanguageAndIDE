import { Alternatives } from "./abstract-alternatives";
import { BinaryExpression } from "./binary-expression";
import { Term } from "./term";

export class ExprNode extends Alternatives {
    constructor() {
        super();
        this.placeholder = "expression";
    }

    parseText(text: string): void {
        this.alternatives.push(new Term());
        this.alternatives.push(new BinaryExpression());
        super.parseText(text);
    }
    textAsHtml(): string {
        throw new Error("Method not implemented.");
    }
    textAsSource(): string {
        throw new Error("Method not implemented.");
    }
    
}