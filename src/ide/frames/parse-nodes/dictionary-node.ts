import { ParseNode } from "../frame-interfaces/parse-node";
import { OPEN_SQ_BRACKET, CLOSE_SQ_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { KVPnode } from "./kvp-node";
import { PunctuationNode } from "./punctuation-node";
import { File } from "../frame-interfaces/file";

export class DictionaryNode extends AbstractSequence {
  csv: CSV | undefined;
  elementConstructor: () => ParseNode;

  constructor(file: File, keyConstructor: () => ParseNode, valueConstructor: () => ParseNode) {
    super(file);
    this.elementConstructor = () => new KVPnode(file, keyConstructor, valueConstructor);
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new PunctuationNode(this.file, OPEN_SQ_BRACKET));
      this.csv = new CSV(this.file, this.elementConstructor, 1);
      this.addElement(this.csv);
      this.addElement(new PunctuationNode(this.file, CLOSE_SQ_BRACKET));
      super.parseText(text);
    }
  }
}
