import { newKeyword } from "../../../compiler/elan-keywords";
import { KeywordCompletion, TokenType } from "../symbol-completion-helpers";
import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { ArgListNode } from "./arg-list-node";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { PunctuationNode } from "./punctuation-node";
import { SpaceNode } from "./space-node";
import { TypeSimpleOrGeneric } from "./type-simple-or-generic";

export class NewInstance extends AbstractSequence {
  type: TypeSimpleOrGeneric | undefined;
  args: ArgListNode | undefined;

  parseText(text: string): void {
    if (text.trim().length > 0) {
      if (!this.file.language().parseText(this, text)) {
        this.addElement(new KeywordNode(this.file, newKeyword));
        this.addElement(new SpaceNode(this.file, Space.required));
        this.addCommonElements();
      }
      super.parseText(text);
    }
  }

  addCommonElements() {
    this.type = new TypeSimpleOrGeneric(this.file, new Set<TokenType>([TokenType.type_concrete]));
    this.addElement(this.type);
    this.addElement(new SpaceNode(this.file, Space.ignored));
    this.addElement(new PunctuationNode(this.file, OPEN_BRACKET));
    this.addElement(new SpaceNode(this.file, Space.ignored));
    this.args = new ArgListNode(this.file, () => this.type!.matchedText);
    this.addElement(this.args);
    this.addElement(new SpaceNode(this.file, Space.ignored));
    this.addElement(new PunctuationNode(this.file, CLOSE_BRACKET));
  }

  symbolCompletion_keywords(): Set<KeywordCompletion> {
    return this.getElements().length === 0
      ? new Set<KeywordCompletion>([KeywordCompletion.create(newKeyword)])
      : super.symbolCompletion_keywords();
  }

  renderAsHtml() {
    return this.delegateHtmlToLanguage();
  }
}
