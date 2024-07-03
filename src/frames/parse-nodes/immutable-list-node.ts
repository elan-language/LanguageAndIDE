import { AbstractSequence } from "./abstract-sequence";
import { SymbolNode } from "./symbol-node";
import { CSV } from "./csv";
import { ParseNode } from "./parse-node";
import { CLOSE_BRACE, OPEN_BRACE } from "../symbols";

export class ImmutableListNode extends AbstractSequence {
  csv: CSV | undefined;
  elementConstructor: () => ParseNode;

  constructor(elementConstructor: () => ParseNode) {
    super();
    this.elementConstructor = elementConstructor;
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new SymbolNode(OPEN_BRACE));
      this.csv = new CSV(this.elementConstructor, 1);
      this.addElement(this.csv);
      this.addElement(new SymbolNode(CLOSE_BRACE));
      super.parseText(text);
    }
  }
}
