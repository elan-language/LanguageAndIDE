import { AbstractAlternatives } from "./abstract-alternatives";
import { LiteralValue } from "./literal-value";
import { UnaryTerm } from "./unary-term";
import { BracketedExpression } from "./bracketed-expression";
import { DottedTerm } from "./dotted-term";
import { NewInstance } from "./new-instance";
import { EnumVal } from "./enum-val";
import { IndexedTerm } from "./indexed-term";
import { ListOfExpr } from "./listOfExpr";
import { TupleDefNode } from "./tuple-def-node";
import { Lambda } from "./lambda";
import { IfExpr } from "./if-expr";

export class Term extends AbstractAlternatives {
    constructor() {
        super();
        this.placeholder = "expression";
    }

    parseText(text: string): void {
        //Sub nodes added only when asked to parse
        this.alternatives.push(new LiteralValue());
        this.alternatives.push(new UnaryTerm());
        this.alternatives.push(new IndexedTerm());
        this.alternatives.push(new DottedTerm());
        this.alternatives.push(new NewInstance());
        this.alternatives.push(new EnumVal());
        this.alternatives.push(new BracketedExpression());
        this.alternatives.push(new ListOfExpr());
        this.alternatives.push(new TupleDefNode());
        this.alternatives.push(new Lambda());
        this.alternatives.push(new IfExpr());
        super.parseText(text);
    }
    
}