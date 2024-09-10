import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { IdentifierNode } from "./identifier-node";

export class DeconstructedTuple extends AbstractSequence {
  csv: CSV | undefined;

  parseText(text: string): void {
    if (text.length > 0) {
      this.csv = new CSV(() => new IdentifierNode(), 2);
      this.addElement(this.csv);
      super.parseText(text);
    }
  }
}
