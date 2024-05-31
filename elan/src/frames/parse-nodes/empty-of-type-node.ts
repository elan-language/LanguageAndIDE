import { emptyKeyword } from "../keywords";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";
import { TypeDictionaryNode } from "./type-dictionary-node";
import { TypeImmutableDictionaryNode } from "./type-immutable-dictionary-node";
import { TypeImmutableListNode } from "./type-immutable-list-node";
import { TypeListNode } from "./type-list-node";

export class EmptyOfTypeNode extends AbstractSequence {
  type: Alternatives | undefined;

  parseText(text: string): void {
    this.addElement(new KeywordNode(emptyKeyword));
    this.addElement(new SpaceNode(Space.required));
    const list = () => new TypeListNode();
    const immList = () => new TypeImmutableListNode();
    const dict = () => new TypeDictionaryNode();
    const immDict = () => new TypeImmutableDictionaryNode();
    this.type = new Alternatives([list, immList, dict, immDict]);
    this.addElement(this.type);
    super.parseText(text);
  }
}
