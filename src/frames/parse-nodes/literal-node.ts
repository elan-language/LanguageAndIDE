import { AbstractAlternatives } from "./abstract-alternatives";
import { ArrayListNode } from "./array-list-node";
import { DictionaryNode } from "./dictionary-node";
import { ImmutableDictionaryNode } from "./immutable-dictionary-node";
import { ListNode } from "./list-node";
import { LitValueNode } from "./lit-value";

export class LiteralNode extends AbstractAlternatives {
  constructor() {
    super();
    this.completionWhenEmpty = "";
  }

  parseText(text: string): void {
    this.alternatives.push(new LitValueNode());
    this.alternatives.push(new ListNode(() => new LiteralNode()));
    this.alternatives.push(new ArrayListNode(() => new LiteralNode()));
    this.alternatives.push(
      new DictionaryNode(
        () => new LitValueNode(),
        () => new LiteralNode(),
      ),
    );
    this.alternatives.push(
      new ImmutableDictionaryNode(
        () => new LitValueNode(),
        () => new LiteralNode(),
      ),
    );
    super.parseText(text);
  }
}
