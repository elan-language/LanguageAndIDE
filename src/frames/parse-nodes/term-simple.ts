import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { ArrayNode } from "./array-list-node";
import { BracketedExpression } from "./bracketed-expression";
import { DictionaryNode } from "./dictionary-node";
import { ExprNode } from "./expr-node";
import { ImmutableDictionaryNode } from "./immutable-dictionary-node";
import { IndexSingle } from "./index-single";
import { ListNode } from "./list-node";
import { LitValueNode } from "./lit-value";
import { OptionalNode } from "./optional-node";
import { ReferenceNode } from "./reference-node";
import { TupleNode } from "./tuple-node";
import { TypeOfNode } from "./type-of-node";
import { UnaryExpression } from "./unary-expression";

export class TermSimple extends AbstractSequence {
  alternatives: Alternatives | undefined;
  optIndex: OptionalNode | undefined;

  constructor() {
    super();
    this.completionWhenEmpty = "<i>expression</i>";
  }

  parseText(text: string): void {
    if (text.trim().length > 0) {
      const litVal = () => new LitValueNode();
      const ref = () => new ReferenceNode();
      const typeOf = () => new TypeOfNode();
      const immList = () => new ListNode(() => new ExprNode());
      const arrList = () => new ArrayNode(() => new ExprNode());
      const dict = () =>
        new DictionaryNode(
          () => new ExprNode(),
          () => new ExprNode(),
        );
      const immDict = () =>
        new ImmutableDictionaryNode(
          () => new ExprNode(),
          () => new ExprNode(),
        );
      const tuple = () => new TupleNode();
      const unary = () => new UnaryExpression();
      const bracketed = () => new BracketedExpression();
      this.alternatives = new Alternatives([
        litVal,
        ref,
        typeOf,
        immList,
        arrList,
        dict,
        immDict,
        tuple,
        unary,
        bracketed,
      ]);
      this.optIndex = new OptionalNode(new IndexSingle());
      this.addElement(this.alternatives);
      this.addElement(this.optIndex);
      super.parseText(text);
    }
  }
}
