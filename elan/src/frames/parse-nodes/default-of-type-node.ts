import { defaultKeyword } from "../keywords";
import { AbstractSequence } from "./abstract-sequence";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";
import { TypeSimpleOrGeneric } from "./type-simple-or-generic";

export class DefaultOfTypeNode extends AbstractSequence {
  type: TypeSimpleOrGeneric | undefined;

  parseText(text: string): void {
    this.addElement(new KeywordNode(defaultKeyword));
    this.addElement(new SpaceNode(Space.required));
    this.type = new TypeSimpleOrGeneric();
    this.addElement(this.type);
    super.parseText(text);
  }
}
