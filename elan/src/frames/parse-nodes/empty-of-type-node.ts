import { defaultKeyword, emptyKeyword } from "../keywords";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";
import { TypeImmutableListNode } from "./type-immutable-list-node";
import { TypeListNode } from "./type-list-node";

export class EmptyOfTypeNode extends AbstractSequence {
  type: Alternatives | undefined;

  parseText(text: string): void {
    this.addElement(new KeywordNode(emptyKeyword));
    this.addElement(new SpaceNode(Space.required));
    const list = () => new TypeListNode();
    const immList = () => new TypeImmutableListNode();
    this.type = new Alternatives([list, immList]);
    this.addElement(this.type);
    super.parseText(text);
  }
}
