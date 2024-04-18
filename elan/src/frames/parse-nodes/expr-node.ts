import { AbstractAlternatives } from "./abstract-alternatives";
import { BinaryExpression } from "./binary-expression";
import { Term } from "./term";
import { TermWith } from "./term-with";

export class ExprNode extends AbstractAlternatives {
    constructor() {
        super();
        this.completionWhenEmpty = "expression";
    }

    parseText(text: string): void {
        this.alternatives.push(new Term());
        this.alternatives.push(new BinaryExpression());
        this.alternatives.push(new TermWith());
        super.parseText(text);
    }
}