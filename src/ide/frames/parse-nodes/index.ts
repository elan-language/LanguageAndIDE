import { OPEN_SQ_BRACKET, CLOSE_SQ_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { IndexValue } from "./index-value";
import { PunctuationNode } from "./punctuation-node";

export class Index extends AbstractSequence {
  contents: IndexValue | undefined;

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      this.addElement(new PunctuationNode(this.file, OPEN_SQ_BRACKET));
      this.contents = new IndexValue(this.file);
      this.addElement(this.contents);
      this.addElement(new PunctuationNode(this.file, CLOSE_SQ_BRACKET));
      super.parseText(text);
    }
  }
}
