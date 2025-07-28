import { ParseNode } from "../frame-interfaces/parse-node";
import { OPEN_BRACE, CLOSE_BRACE } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { KVPnode } from "./kvp-node";
import { PunctuationNode } from "./punctuation-node";

export class DictionaryImmutableNode extends AbstractSequence {
  csv: CSV | undefined;
  elementConstructor: () => ParseNode;

  constructor(keyConstructor: () => ParseNode, valueConstructor: () => ParseNode) {
    super();
    this.elementConstructor = () => new KVPnode(keyConstructor, valueConstructor);
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new PunctuationNode(OPEN_BRACE));
      this.csv = new CSV(this.elementConstructor, 1);
      this.addElement(this.csv);
      this.addElement(new PunctuationNode(CLOSE_BRACE));
      super.parseText(text);
    }
  }
}
