import { ExprNode } from "./expr-node";
import { AbstractSequence } from "./abstract-sequence";
import { SymbolNode } from "./symbol-node";
import { UnknownType } from "../symbols/unknown-type";
import { Field } from "../interfaces/field";

import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";

export class BracketedExpression extends AbstractSequence {
  expr: ExprNode | undefined;

  constructor() {
    super();
    this.completionWhenEmpty = "";
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new SymbolNode(OPEN_BRACKET));
      this.expr = new ExprNode();
      this.addElement(this.expr);
      this.addElement(new SymbolNode(CLOSE_BRACKET));
      super.parseText(text);
    }
  }
}
