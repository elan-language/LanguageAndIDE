import { CLOSE_SQ_BRACKET, OPEN_SQ_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { ExprNode2 } from "./expr-node2";
import { PunctuationNode } from "./punctuation-node";

export class IndexDouble extends AbstractSequence {
  indexOne: ExprNode2 | undefined;
  indexTwo: ExprNode2 | undefined;

  parseText(text: string): void {
    if (text.length > 0) {
      this.indexOne = new ExprNode2();
      this.indexTwo = new ExprNode2();
      this.addElement(new PunctuationNode(OPEN_SQ_BRACKET));
      this.addElement(this.indexOne);
      this.addElement(new PunctuationNode(CLOSE_SQ_BRACKET));
      this.addElement(new PunctuationNode(OPEN_SQ_BRACKET));
      this.addElement(this.indexTwo);
      this.addElement(new PunctuationNode(CLOSE_SQ_BRACKET));
      return super.parseText(text);
    }
  }
}
