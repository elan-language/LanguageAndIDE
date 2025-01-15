import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { PunctuationNode } from "./punctuation-node";
import { TupleMemberNode } from "./tuple-member-node";

export class TupleNode extends AbstractSequence {
  csv: CSV | undefined;

  parseText(text: string): void {
    if (text.trim().length > 0) {
      this.addElement(new PunctuationNode(OPEN_BRACKET));
      this.csv = new CSV(() => new TupleMemberNode(), 2);
      this.addElement(this.csv);
      this.addElement(new PunctuationNode(CLOSE_BRACKET));
      super.parseText(text);
    }
  }
}
