import { CLOSE_SQ_BRACKET, OPEN_SQ_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { Alternatives } from "./alternatives";
import { ExprNode2 } from "./expr-node2";
import { PunctuationNode } from "./punctuation-node";
import { RangeNode } from "./range-node";

export class IndexSingle extends AbstractSequence {
  contents: Alternatives | undefined;

  constructor() {
    super();
    this.completionWhenEmpty = "name";
  }

  parseText(text: string): void {
    this.remainingText = text;
    const expr = () => new ExprNode2();
    const range = () => new RangeNode();
    this.contents = new Alternatives([expr, range]);
    if (text.length > 0) {
      this.addElement(new PunctuationNode(OPEN_SQ_BRACKET));
      this.addElement(this.contents);
      this.addElement(new PunctuationNode(CLOSE_SQ_BRACKET));
      super.parseText(text);
    }
  }
}
