import { copyKeyword, withKeyword } from "../keywords";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { IdentifierNode } from "./identifier-node";
import { KeywordNode } from "./keyword-node";
import { Space } from "./parse-node-helpers";
import { SetClause } from "./set-clause";
import { SpaceNode } from "./space-node";

export class CopyWith extends AbstractSequence {
  original: IdentifierNode | undefined;
  changes: CSV | undefined;

  constructor() {
    super();
    this.completionWhenEmpty = "expression";
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new KeywordNode(copyKeyword));
      this.addElement(new SpaceNode(Space.required));
      this.original = new IdentifierNode();
      this.addElement(this.original);
      this.addElement(new SpaceNode(Space.added));
      this.addElement(new KeywordNode(withKeyword));
      this.addElement(new SpaceNode(Space.required));
      this.changes = new CSV(() => new SetClause(), 1);
      this.addElement(this.changes);
      return super.parseText(text);
    }
  }
}
