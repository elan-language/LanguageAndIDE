import { AbstractAlternatives } from "./abstract-alternatives";
import { IdentifierNode } from "./identifier-node";
import { DictionaryImmutableNode } from "./immutable-dictionary-node";
import { ListImmutableNode } from "./list-immutable-node";
import { LitValueNode } from "./lit-value-node";
import { TupleNode } from "./tuple-node";

export class ConstantValueNode extends AbstractAlternatives {
  constructor() {
    super();
    this.completionWhenEmpty = "";
  }

  parseText(text: string): void {
    this.alternatives.push(new IdentifierNode());
    this.alternatives.push(new LitValueNode());
    this.alternatives.push(new TupleNode()); //TODO This could do with constraints on members - as below
    this.alternatives.push(new ListImmutableNode(() => new ConstantValueNode()));
    this.alternatives.push(
      new DictionaryImmutableNode(
        () => new ConstantValueNode(),
        () => new ConstantValueNode(),
      ),
    );
    super.parseText(text);
  }
}
