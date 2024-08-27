import { AbstractAlternatives } from "./abstract-alternatives";
import { ArrayListNode } from "./array-list-node";
import { BracketedExpression } from "./bracketed-expression";
import { DictionaryNode } from "./dictionary-node";
import { ExprNode } from "./expr-node";
import { ImmutableDictionaryNode } from "./immutable-dictionary-node";
import { ImmutableListNode } from "./immutable-list-node";
import { LitValueNode } from "./lit-value";
import { SymbolNode } from "./symbol-node";
import { TupleNode } from "./tuple-node";
import { UnaryExpression } from "./unary-expression";

export class TermSimple extends AbstractAlternatives {
  constructor() {
    super();
    this.completionWhenEmpty = "expression";
  }

  parseText(text: string): void {
    this.alternatives.push(new SymbolNode());
    this.alternatives.push(new LitValueNode());
    this.alternatives.push(new ImmutableListNode(() => new ExprNode()));
    this.alternatives.push(new ArrayListNode(() => new ExprNode()));
    this.alternatives.push(
      new DictionaryNode(
        () => new ExprNode(),
        () => new ExprNode(),
      ),
    );
    this.alternatives.push(
      new ImmutableDictionaryNode(
        () => new ExprNode(),
        () => new ExprNode(),
      ),
    );
    this.alternatives.push(new TupleNode());
    this.alternatives.push(new UnaryExpression());
    this.alternatives.push(new BracketedExpression());
    super.parseText(text);
  }
}
