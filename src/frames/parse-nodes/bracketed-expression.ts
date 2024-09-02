import { AbstractSequence } from "./abstract-sequence";
import { ExprNode2 } from "./expr-node2";
import { PunctuationNode } from "./punctuation-node";

import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";

export class BracketedExpression extends AbstractSequence {
  expr: ExprNode2 | undefined;

  constructor() {
    super();
    this.completionWhenEmpty = "";
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new PunctuationNode(OPEN_BRACKET));
      this.expr = new ExprNode2();
      this.addElement(this.expr);
      this.addElement(new PunctuationNode(CLOSE_BRACKET));
      super.parseText(text);
    }
  }
}
