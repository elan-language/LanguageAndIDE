import { CLOSE_BRACKET, OPEN_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { IdentifierNode } from "./identifier-node";
import { SymbolNode } from "./symbol-node";

export class DeconstructedTuple extends AbstractSequence {
  csv: CSV | undefined;

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new SymbolNode(OPEN_BRACKET));
      this.csv = new CSV(() => new IdentifierNode(), 2);
      this.addElement(this.csv);
      this.addElement(new SymbolNode(CLOSE_BRACKET));
      super.parseText(text);
    }
  }
}
