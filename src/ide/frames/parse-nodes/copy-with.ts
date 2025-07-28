import { copyKeyword } from "../keywords";
import { KeywordCompletion, TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { IdentifierOrThis } from "./identiferOrThis";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";
import { WithClause } from "./with-clause";

export class CopyWith extends AbstractSequence {
  original: IdentifierOrThis;
  withClause: WithClause | undefined;
  tokenTypes = new Set([
    TokenType.id_let,
    TokenType.id_parameter_out,
    TokenType.id_parameter_regular,
    TokenType.id_parameter_out,
    TokenType.id_property,
    TokenType.id_variable,
  ]);

  constructor() {
    super();
    this.original = new IdentifierOrThis();
  }

  parseText(text: string): void {
    if (text.trim().length > 0) {
      this.addElement(new KeywordNode(copyKeyword));
      this.addElement(new SpaceNode(Space.required));
      this.addElement(this.original);
      this.withClause = new WithClause(() => this.original!.matchedText);
      this.addElement(this.withClause);
      return super.parseText(text);
    }
  }

  symbolCompletion_keywords(): Set<KeywordCompletion> {
    return this.getElements().length === 0
      ? new Set<KeywordCompletion>([KeywordCompletion.create(copyKeyword)])
      : super.symbolCompletion_keywords();
  }
}
