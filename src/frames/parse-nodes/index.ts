import { CLOSE_SQ_BRACKET, OPEN_SQ_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { CSV } from "./csv";
import { ExprNode } from "./expr-node";
import { PunctuationNode } from "./punctuation-node";
import { RangeNode } from "./range-node";

export class Index extends AbstractSequence {
  contents: CSV | undefined;

  parseText(text: string): void {
    this.remainingText = text;
    const expr = () => new ExprNode();
    const range = () => new RangeNode();
    this.contents = new CSV(() => new Alternatives([expr, range]), 1);
    if (text.length > 0) {
      this.addElement(new PunctuationNode(OPEN_SQ_BRACKET));
      this.addElement(this.contents);
      this.addElement(new PunctuationNode(CLOSE_SQ_BRACKET));
      super.parseText(text);
    }
  }
}
