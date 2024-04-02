import { AbstractAlternatives } from "./abstract-alternatives";
import { LitValueNode } from "./lit-value";
import { UnaryExpression } from "./unary-expression";
import { BracketedExpression } from "./bracketed-expression";
import { NewInstance } from "./new-instance";
import { TupleNode as TupleNode } from "./tuple-node";
import { Lambda } from "./lambda";
import { IfExpr } from "./if-expr";
import { Field } from "../interfaces/field";
import { List } from "./list";
import { ExprNode } from "./expr-node";
import { VarRefNode } from "./var-ref-node";
import { FunctionCallNode } from "./function-call-node";
import { LiteralNode } from "./literal-node";
import { KeywordNode } from "./keyword-node";
import { thisKeyword } from "../keywords";
import { DefaultOfTypeNode } from "./default-of-type-node";

export class Term extends AbstractAlternatives {
    constructor() {
        super();
        this.placeholder = "expression";
    }

    parseText(text: string): void {
        //Sub nodes added only when asked to parse
        this.alternatives.push(new BracketedExpression());
        this.alternatives.push(new Lambda());
        this.alternatives.push(new IfExpr());
        this.alternatives.push(new NewInstance());
        this.alternatives.push(new UnaryExpression());
        this.alternatives.push(new LiteralNode());
        this.alternatives.push(new VarRefNode());
        this.alternatives.push(new FunctionCallNode());
        this.alternatives.push(new KeywordNode(thisKeyword));
        this.alternatives.push(new DefaultOfTypeNode());
        this.alternatives.push(new List(() => new ExprNode()));
        this.alternatives.push(new TupleNode());
        super.parseText(text);
    }
}