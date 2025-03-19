import { AbstractAlternatives } from "./abstract-alternatives";
import { IdentifierNode } from "./identifier-node";
import { DictionaryImmutableNode } from "./immutable-dictionary-node";
import { ListImmutableNode } from "./list-immutable-node";
import { LitValueNode } from "./lit-value";
import { TupleNode } from "./tuple-node";

export class ConstantLiteralNode extends AbstractAlternatives {
  constructor() {
    super();
    this.completionWhenEmpty = "";
  }

  parseText(text: string): void {
    this.alternatives.push(new IdentifierNode());
    this.alternatives.push(new LitValueNode());
    this.alternatives.push(new TupleNode());
    this.alternatives.push(new ListImmutableNode(() => new ConstantLiteralNode()));
    this.alternatives.push(
      new DictionaryImmutableNode(
        () => new ConstantLiteralNode(),
        () => new ConstantLiteralNode(),
      ),
    );
    this.alternatives.push(new IdentifierNode()); // But compile rule to enforce that it can only be another constant, not a variable
    super.parseText(text);
  }
}
