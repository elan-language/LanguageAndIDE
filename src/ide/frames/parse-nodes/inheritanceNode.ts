import { inheritsKeyword } from "../../../compiler/keywords";
import { KeywordCompletion, TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";
import { TypeNode } from "./type-node";

export class InheritanceNode extends AbstractSequence {
  inherits: KeywordNode | undefined;
  typeList: CSV | undefined;

  parseText(text: string): void {
    if (text.length > 0) {
      this.inherits = new KeywordNode(inheritsKeyword);
      this.addElement(this.inherits);
      this.addElement(new SpaceNode(Space.required));
      this.typeList = new CSV(() => new TypeNode(new Set<TokenType>([TokenType.type_abstract])), 1);
      this.typeList.setSyntaxCompletionWhenEmpty("Type(s) - comma-separated");
      this.addElement(this.typeList);
      super.parseText(text);
    }
  }

  symbolCompletion_keywords(): Set<KeywordCompletion> {
    return this.getElements().length === 0
      ? new Set<KeywordCompletion>([KeywordCompletion.create(inheritsKeyword)])
      : super.symbolCompletion_keywords();
  }
}
