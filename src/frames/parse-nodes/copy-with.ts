import { copyKeyword } from "../keywords";
import { TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { IdentifierNode } from "./identifier-node";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";
import { WithClause } from "./with-clause";

export class CopyWith extends AbstractSequence {
  original: IdentifierNode | undefined;
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
  }

  parseText(text: string): void {
    if (text.trim().length > 0) {
      this.addElement(new KeywordNode(copyKeyword));
      this.addElement(new SpaceNode(Space.required));
      this.original = new IdentifierNode(this.tokenTypes);
      this.addElement(this.original);
      this.withClause = new WithClause(() => this.original!.matchedText);
      this.addElement(this.withClause);
      return super.parseText(text);
    }
  }

  symbolCompletion_keywords(): Set<string> {
    return this.getElements().length === 0
      ? new Set<string>([copyKeyword])
      : super.symbolCompletion_keywords();
  }
}
