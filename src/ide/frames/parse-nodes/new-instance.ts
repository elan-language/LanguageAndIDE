import { newKeyword } from "../../../compiler/keywords";
import { KeywordCompletion, TokenType } from "../symbol-completion-helpers";
import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { ArgListNode } from "./arg-list-node";
import { KeywordNode } from "./keyword-node";
import { OptionalNode } from "./optional-node";
import { Space } from "./parse-node-helpers";
import { PunctuationNode } from "./punctuation-node";
import { SpaceNode } from "./space-node";
import { TypeSimpleOrGeneric } from "./type-simple-or-generic";
import { WithClause } from "./with-clause";

export class NewInstance extends AbstractSequence {
  type: TypeSimpleOrGeneric | undefined;
  args: ArgListNode | undefined;
  withClause: OptionalNode | undefined;

  parseText(text: string): void {
    if (text.trim().length > 0) {
      this.addElement(new KeywordNode(newKeyword));
      this.addElement(new SpaceNode(Space.required));
      this.type = new TypeSimpleOrGeneric(new Set<TokenType>([TokenType.type_concrete]));
      this.addElement(this.type);
      this.addElement(new SpaceNode(Space.ignored));
      this.addElement(new PunctuationNode(OPEN_BRACKET));
      this.addElement(new SpaceNode(Space.ignored));
      this.args = new ArgListNode(() => this.type!.matchedText);
      this.addElement(this.args);
      this.addElement(new SpaceNode(Space.ignored));
      this.addElement(new PunctuationNode(CLOSE_BRACKET));
      this.withClause = new OptionalNode(new WithClause(() => this.type!.matchedText));
      this.addElement(this.withClause);
      super.parseText(text);
    }
  }

  symbolCompletion_keywords(): Set<KeywordCompletion> {
    return this.getElements().length === 0
      ? new Set<KeywordCompletion>([KeywordCompletion.create(newKeyword)])
      : super.symbolCompletion_keywords();
  }

  override renderAsHtml(): string {
    return super.renderAsHtml().substring(18);
  }
}
