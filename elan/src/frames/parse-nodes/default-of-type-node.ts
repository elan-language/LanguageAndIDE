import { defaultKeyword } from "../keywords";
import { AbstractSequence } from "./abstract-sequence";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";
import { TypeWithOptGenerics } from "./type-with-opt-generics";

export class DefaultOfTypeNode extends AbstractSequence {
  type: TypeWithOptGenerics | undefined;

  parseText(text: string): void {
    this.addElement(new KeywordNode(defaultKeyword));
    this.addElement(new SpaceNode(Space.required));
    this.type = new TypeWithOptGenerics();
    this.addElement(this.type);
    super.parseText(text);
  }
}
