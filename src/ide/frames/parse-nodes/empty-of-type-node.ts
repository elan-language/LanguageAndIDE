import { emptyKeyword } from "../../../compiler/elan-keywords";
import { KeywordCompletion, TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";
import { TypeNode } from "./type-node";

export class EmptyOfTypeNode extends AbstractSequence {
  type: TypeNode | undefined;

  parseText(text: string): void {
    if (text.trim().length > 0) {
      this.addElement(new KeywordNode(this.file, emptyKeyword));
      this.addElement(new SpaceNode(this.file, Space.required));
      this.type = new TypeNode(
        this.file,
        new Set<TokenType>([
          TokenType.type_concrete,
          TokenType.type_abstract,
          TokenType.type_enum,
          TokenType.type_notInheritable,
        ]),
      );
      this.addElement(this.type);
      super.parseText(text);
    }
  }

  symbolCompletion_keywords(): Set<KeywordCompletion> {
    return this.getElements().length === 0
      ? new Set<KeywordCompletion>([KeywordCompletion.create(emptyKeyword)])
      : super.symbolCompletion_keywords();
  }
}
