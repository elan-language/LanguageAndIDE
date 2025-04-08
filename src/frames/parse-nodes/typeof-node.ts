import { typeofKeyword } from "../keywords";
import { KeywordCompletion, TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";
import { TypeNode } from "./type-node";

export class TypeofNode extends AbstractSequence {
  type: TypeNode | undefined;

  parseText(text: string): void {
    if (text.trim().length > 0) {
      this.addElement(new KeywordNode(typeofKeyword));
      this.addElement(new SpaceNode(Space.required));
      this.type = new TypeNode(
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
      ? new Set<KeywordCompletion>([KeywordCompletion.create(typeofKeyword)])
      : super.symbolCompletion_keywords();
  }
}
