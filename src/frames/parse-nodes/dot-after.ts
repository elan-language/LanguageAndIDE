import { DOT } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { ParseNode } from "./parse-node";
import { PunctuationNode } from "./punctuation-node";

export class DotAfter extends AbstractSequence {
  node: ParseNode;

  constructor(node: ParseNode) {
    super();
    this.node = node;
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(this.node);
      this.addElement(new PunctuationNode(DOT));
      super.parseText(text);
    }
  }
}
