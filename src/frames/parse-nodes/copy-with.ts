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
}
