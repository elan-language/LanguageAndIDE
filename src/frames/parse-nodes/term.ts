import { thisKeyword } from "../keywords";
import { AbstractAlternatives } from "./abstract-alternatives";
import { ArrayListNode } from "./array-list-node";
import { BracketedExpression } from "./bracketed-expression";
import { DictionaryNode } from "./dictionary-node";
import { ExprNode } from "./expr-node";
import { FunctionCallNode } from "./function-call-node";
import { ImmutableDictionaryNode } from "./immutable-dictionary-node";
import { ImmutableListNode } from "./immutable-list-node";
import { KeywordNode } from "./keyword-node";
import { LitValueNode } from "./lit-value";
import { TupleNode } from "./tuple-node";
import { UnaryExpression } from "./unary-expression";
import { VarRefNode } from "./var-ref-node";

export class Term extends AbstractAlternatives {
  constructor() {
    super();
    this.completionWhenEmpty = "expression";
  }

  parseText(text: string): void {
    //TermSimple:
    this.alternatives.push(new ImmutableListNode(() => new ExprNode()));
    this.alternatives.push(new ArrayListNode(() => new ExprNode()));
    this.alternatives.push(new DictionaryNode(() => new ExprNode(), () => new ExprNode()));
    this.alternatives.push(new ImmutableDictionaryNode(() => new ExprNode(), () => new ExprNode()));
    this.alternatives.push(new TupleNode());
    this.alternatives.push(new UnaryExpression());
    this.alternatives.push(new BracketedExpression());
    //  Symbol
    this.alternatives.push(new LitValueNode());

    // ends TermSimple


    // 'this' needs to not be a keyword see #707
    this.alternatives.push(new KeywordNode(thisKeyword));
    this.alternatives.push(new VarRefNode());
    this.alternatives.push(new FunctionCallNode());


    super.parseText(text);
  }
}
