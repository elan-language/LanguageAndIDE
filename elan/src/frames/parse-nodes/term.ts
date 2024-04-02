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
    constructor(field : Field) {
        super(field);
        this.placeholder = "expression";
    }

    parseText(text: string): void {
        //Sub nodes added only when asked to parse
        this.alternatives.push(new BracketedExpression(this.field));
        this.alternatives.push(new Lambda(this.field));
        this.alternatives.push(new IfExpr(this.field));
        this.alternatives.push(new NewInstance(this.field));
        this.alternatives.push(new UnaryExpression(this.field));
        this.alternatives.push(new LiteralNode(this.field));
        this.alternatives.push(new VarRefNode(this.field));
        this.alternatives.push(new FunctionCallNode(this.field));
        this.alternatives.push(new KeywordNode(thisKeyword, this.field));
        this.alternatives.push(new DefaultOfTypeNode(this.field));
        this.alternatives.push(new List(() => new ExprNode(this.field), this.field));
        this.alternatives.push(new TupleNode(this.field));
        super.parseText(text);
    }
}