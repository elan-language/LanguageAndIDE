import { withKeyword } from "../keywords";
import { ParseStatus } from "../status-enums";
import { SymbolCompletionSpec_Old, TokenType } from "../symbol-completion-helpers";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";
import { ToClause } from "./to-clause";

export class WithClause extends AbstractSequence {
  toClauses: CSV | undefined;
  private constraintId: () => string;

  constructor(constraintId: () => string) {
    super();
    this.constraintId = constraintId;
    this.completionWhenEmpty = " with <i>name</i> to <i>expression</i>";
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new SpaceNode(Space.added));
      this.addElement(new KeywordNode(withKeyword));
      this.addElement(new SpaceNode(Space.required));
      this.toClauses = new CSV(() => new ToClause(this.constraintId), 1);
      this.addElement(this.toClauses);
      return super.parseText(text);
    }
  }

  symbolCompletion_getSpec_Old(): SymbolCompletionSpec_Old {
    const elems = this.getElements();
    if (elems[2].status === ParseStatus.valid) {
      return elems[3].symbolCompletion_getSpec_Old();
    }

    return new SymbolCompletionSpec_Old("", new Set<TokenType>([TokenType.none]));
  }

  symbolCompletion_keywords(): Set<string> {
    return this.getElements().length === 0
      ? new Set<string>([withKeyword])
      : super.symbolCompletion_keywords();
  }
}
