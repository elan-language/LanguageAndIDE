import { AbstractAlternatives } from "./abstract-alternatives";
import { IdentifierNode } from "./identifier-node";
import { ImmutableDictionaryNode } from "./immutable-dictionary-node";
import { ListNode } from "./list-node";
import { LitValueNode } from "./lit-value";

export class ConstantLiteralNode extends AbstractAlternatives {
  constructor() {
    super();
    this.completionWhenEmpty = "";
  }

  parseText(text: string): void {
    this.alternatives.push(new LitValueNode());
    this.alternatives.push(new ListNode(() => new ConstantLiteralNode()));
    this.alternatives.push(
      new ImmutableDictionaryNode(
        () => new LitValueNode(),
        () => new ConstantLiteralNode(),
      ),
    );
    this.alternatives.push(new IdentifierNode()); // But compile rule to enforce that it can only be another constant, not a variable
    super.parseText(text);
  }
}
