import { OPEN_SQ_BRACKET, CLOSE_SQ_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { IndexValue } from "./index-value";
import { PunctuationNode } from "./punctuation-node";

export class Index extends AbstractSequence {
  contents: IndexValue | undefined;

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.addElement(new PunctuationNode(OPEN_SQ_BRACKET));
      this.contents = new IndexValue();
      this.addElement(this.contents);
      this.addElement(new PunctuationNode(CLOSE_SQ_BRACKET));
      super.parseText(text);
    }
  }
}
