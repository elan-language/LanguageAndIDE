import { AbstractAlternatives } from "./abstract-alternatives";
import { ArrayNode } from "./array-node";
import { DictionaryNode } from "./dictionary-node";
import { DictionaryImmutableNode } from "./immutable-dictionary-node";
import { ListImmutableNode } from "./list-immutable-node";
import { LitValueNode } from "./lit-value";

export class LiteralNode extends AbstractAlternatives {
  constructor() {
    super();
    this.completionWhenEmpty = "";
  }

  parseText(text: string): void {
    this.alternatives.push(new LitValueNode());
    this.alternatives.push(new ListImmutableNode(() => new LiteralNode()));
    this.alternatives.push(new ArrayNode(() => new LiteralNode()));
    this.alternatives.push(
      new DictionaryNode(
        () => new LitValueNode(),
        () => new LiteralNode(),
      ),
    );
    this.alternatives.push(
      new DictionaryImmutableNode(
        () => new LitValueNode(),
        () => new LiteralNode(),
      ),
    );
    super.parseText(text);
  }
}
