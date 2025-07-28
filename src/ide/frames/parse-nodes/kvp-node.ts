import { ParseNode } from "../frame-interfaces/parse-node";
import { COLON } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { PunctuationNode } from "./punctuation-node";

export class KVPnode extends AbstractSequence {
  key: ParseNode | undefined;
  value: ParseNode | undefined;

  private keyConstructor: () => ParseNode;
  private valueConstructor: () => ParseNode;

  constructor(keyConstructor: () => ParseNode, valueConstructor: () => ParseNode) {
    super();
    this.keyConstructor = keyConstructor;
    this.valueConstructor = valueConstructor;
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.key = this.keyConstructor();
      this.value = this.valueConstructor();
      this.addElement(this.key);
      this.addElement(new PunctuationNode(COLON));
      this.addElement(this.value);
      super.parseText(text);
    }
  }
}
