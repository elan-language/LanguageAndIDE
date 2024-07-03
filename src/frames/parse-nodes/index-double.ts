import { AbstractSequence } from "./abstract-sequence";
import { ExprNode } from "./expr-node";
import { CLOSE_SQ_BRACKET, OPEN_SQ_BRACKET } from "../symbols";
import { SymbolNode } from "./symbol-node";

export class IndexDouble extends AbstractSequence {
  indexOne: ExprNode | undefined;
  indexTwo: ExprNode | undefined;

  parseText(text: string): void {
    if (text.length > 0) {
      this.indexOne = new ExprNode();
      this.indexTwo = new ExprNode();
      this.addElement(new SymbolNode(OPEN_SQ_BRACKET));
      this.addElement(this.indexOne);
      this.addElement(new SymbolNode(CLOSE_SQ_BRACKET));
      this.addElement(new SymbolNode(OPEN_SQ_BRACKET));
      this.addElement(this.indexTwo);
      this.addElement(new SymbolNode(CLOSE_SQ_BRACKET));
      return super.parseText(text);
    }
  }
}
