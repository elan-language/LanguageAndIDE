import { emptyKeyword } from "../keywords";
import { TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";
import { TypeNode } from "./type-node";

export class EmptyOfTypeNode extends AbstractSequence {
  type: TypeNode | undefined;

  parseText(text: string): void {
    this.addElement(new KeywordNode(emptyKeyword));
    this.addElement(new SpaceNode(Space.required));
    this.type = new TypeNode(new Set<TokenType>([TokenType.type_concrete]));
    this.addElement(this.type);
    super.parseText(text);
  }

  symbolCompletion_keywords(): Set<string> {
    return this.getElements().length === 0
      ? new Set<string>([emptyKeyword])
      : super.symbolCompletion_keywords();
  }
}
