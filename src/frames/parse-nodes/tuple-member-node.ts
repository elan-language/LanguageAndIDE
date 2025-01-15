import { AbstractAlternatives } from "./abstract-alternatives";
import { LitValueNode } from "./lit-value";
import { ReferenceNode } from "./reference-node";

export class TupleMemberNode extends AbstractAlternatives {
  parseText(text: string): void {
    if (text.trim().length > 0) {
      this.alternatives.push(new LitValueNode());
      this.alternatives.push(new ReferenceNode());
      super.parseText(text);
    }
  }
}
