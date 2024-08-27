import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { LiteralNode } from "./literal-node";
import { PunctuationNode } from "./punctuation-node";

export class LitTuple extends AbstractSequence {
  csv: CSV | undefined;

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new PunctuationNode(OPEN_BRACKET));
      this.csv = new CSV(() => new LiteralNode(), 2);
      this.addElement(this.csv);
      this.addElement(new PunctuationNode(CLOSE_BRACKET));
      super.parseText(text);
    }
  }
}
