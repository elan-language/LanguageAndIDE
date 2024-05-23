import { AbstractAlternatives } from "./abstract-alternatives";
import { ArrayListNode } from "./array-list-node";
import { Dictionary } from "./dictionary";
import { ImmutableListNode } from "./immutable-list-node";
import { LitValueNode } from "./lit-value";

export class LiteralNode extends AbstractAlternatives {
  constructor() {
    super();
    this.completionWhenEmpty = "";
  }

  parseText(text: string): void {
    this.alternatives.push(new LitValueNode());
    this.alternatives.push(new ImmutableListNode(() => new LiteralNode()));
    this.alternatives.push(new ArrayListNode(() => new LiteralNode()));
    this.alternatives.push(
      new Dictionary(
        () => new LitValueNode(),
        () => new LiteralNode(),
      ),
    );
    super.parseText(text);
  }
}
