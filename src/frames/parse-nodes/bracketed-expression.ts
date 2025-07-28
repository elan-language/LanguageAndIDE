import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { ExprNode } from "./expr-node";
import { Space } from "./parse-node-helpers";
import { PunctuationNode } from "./punctuation-node";
import { SpaceNode } from "./space-node";

export class BracketedExpression extends AbstractSequence {
  expr: ExprNode | undefined;

  constructor() {
    super();
    this.completionWhenEmpty = "";
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new PunctuationNode(OPEN_BRACKET));
      this.expr = new ExprNode();
      this.addElement(this.expr);
      this.addElement(new SpaceNode(Space.ignored));
      this.addElement(new PunctuationNode(CLOSE_BRACKET));
      super.parseText(text);
    }
  }
}
