import { SymbolCompletionSpec, TokenType } from "../helpers";
import { withKeyword } from "../keywords";
import { ParseStatus } from "../status-enums";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";
import { ToClause } from "./to-clause";

export class WithClause extends AbstractSequence {
  toClauses: CSV | undefined;

  constructor() {
    super();
    this.completionWhenEmpty = " with <i>name</i> to <i>expression</i>";
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new SpaceNode(Space.added));
      this.addElement(new KeywordNode(withKeyword));
      this.addElement(new SpaceNode(Space.required));
      this.toClauses = new CSV(() => new ToClause(), 1);
      this.addElement(this.toClauses);
      return super.parseText(text);
    }
  }

  getSymbolCompletionSpec(): SymbolCompletionSpec {
    const elems = this.getElements();
    if (elems[2].status === ParseStatus.valid) {
      return elems[3].getSymbolCompletionSpec();
    }

    return new SymbolCompletionSpec("", TokenType.none);
  }
}
