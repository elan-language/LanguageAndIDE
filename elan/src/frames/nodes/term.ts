import { Alternatives } from "./abstract-alternatives";
import { VariableNode } from "./variable-node";
import { Literal } from "./literal";
import { UnaryTerm } from "./unary-term";
import { BracketedExpression } from "./bracketed-expression";

export class Term extends Alternatives {
    constructor() {
        super();
        this.placeholder = "expression";
    }

    parseText(text: string): void {
        //Sub nodes added only when asked to parse
        this.alternatives.push(new VariableNode());
        this.alternatives.push(new Literal());
        this.alternatives.push(new UnaryTerm());
        this.alternatives.push(new BracketedExpression());
        super.parseText(text);
    }
    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
    renderAsSource(): string {
        throw new Error("Method not implemented.");
    }
    
}