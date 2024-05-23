import { AbstractAlternatives } from "./abstract-alternatives";
import { DictionaryNode } from "./dictionary-node";
import { ImmutableDictionaryNode } from "./immutable-dictionary-node";
import { ImmutableListNode } from "./immutable-list-node";
import { LitValueNode } from "./lit-value";

export class ConstantLiteralNode extends AbstractAlternatives {
  constructor() {
    super();
    this.completionWhenEmpty = "";
  }

  parseText(text: string): void {
    this.alternatives.push(new LitValueNode());
    this.alternatives.push(new ImmutableListNode(() => new ConstantLiteralNode()));
    this.alternatives.push(
      new ImmutableDictionaryNode(
        () => new LitValueNode(),
        () => new ConstantLiteralNode(),
      ),
    );
    super.parseText(text);
  }
}
