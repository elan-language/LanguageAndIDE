import { SymbolCompletionSpec } from "../helpers";
import { copyKeyword } from "../keywords";
import { AbstractSequence } from "./abstract-sequence";
import { IdentifierNode } from "./identifier-node";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SpaceNode } from "./space-node";
import { WithClause } from "./with-clause";

export class CopyWith extends AbstractSequence {
  original: IdentifierNode | undefined;
  withClause: WithClause | undefined;

  constructor() {
    super();
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new KeywordNode(copyKeyword));
      this.addElement(new SpaceNode(Space.required));
      this.original = new IdentifierNode();
      this.addElement(this.original);
      this.withClause = new WithClause();
      this.addElement(this.withClause);
      return super.parseText(text);
    }
  }

  getSymbolCompletionSpec(): SymbolCompletionSpec {
    if (this.original && !this.original?.remainingText.includes(" ")) {
      return this.original.getSymbolCompletionSpec();
    }
    const spec = this.withClause!.getSymbolCompletionSpec();
    const id = spec.toMatch;
    const tokenType = spec.tokenTypes[0];
    //Explanation:  the user is asked for a property name (id) - which will be "" initially
    //However, the symbol table is not being asked to match 'id', but 'instance.id'
    //so that user is offered only the properties for that instance type.
    return new SymbolCompletionSpec(`${this.original?.matchedText}.${id}`, tokenType);
  }
}
