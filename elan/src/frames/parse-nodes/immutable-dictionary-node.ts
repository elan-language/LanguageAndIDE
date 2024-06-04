import { ParseNode } from "./parse-node";
import { KVPnode } from "./kvp-node";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { OPEN_BRACE, CLOSE_BRACE } from "../symbols";
import { SymbolNode } from "./symbol-node";

export class ImmutableDictionaryNode extends AbstractSequence {
  csv: CSV | undefined;
  elementConstructor: () => ParseNode;

  constructor(keyConstructor: () => ParseNode, valueConstructor: () => ParseNode) {
    super();
    this.elementConstructor = () => new KVPnode(keyConstructor, valueConstructor);
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
