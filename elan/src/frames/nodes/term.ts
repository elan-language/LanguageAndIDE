import { AbstractAlternatives } from "./abstract-alternatives";
import { IdentifierNode } from "./identifier-node";
import { LiteralValue } from "./literal-value";
import { UnaryTerm } from "./unary-term";
import { BracketedExpression } from "./bracketed-expression";
import { MethodCallNode } from "./method-call-node";

export class Term extends AbstractAlternatives {
    constructor() {
        super();
        this.placeholder = "expression";
    }

    parseText(text: string): void {
        //Sub nodes added only when asked to parse
        this.alternatives.push(new IdentifierNode());
        this.alternatives.push(new LiteralValue());
        this.alternatives.push(new UnaryTerm());
        this.alternatives.push(new BracketedExpression());
        this.alternatives.push(new MethodCallNode());
        super.parseText(text);
    }
    renderAsHtml(): string {
        throw new Error("Method not implemented.");
    }
}