import { COLON } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { IdentifierNode } from "./identifier-node";
import { PunctuationNode } from "./punctuation-node";

export class DeconstructedList extends AbstractSequence {
  head: IdentifierNode | undefined;
  tail: IdentifierNode | undefined;

  parseText(text: string): void {
    if (text.length > 0) {
      this.head = new IdentifierNode();
      this.addElement(this.head);
      this.addElement(new PunctuationNode(COLON));
      this.tail = new IdentifierNode();
      this.addElement(this.tail);
      super.parseText(text);
    }
  }
}
