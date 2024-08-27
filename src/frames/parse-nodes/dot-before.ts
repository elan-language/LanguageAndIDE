import { DOT } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { ParseNode } from "./parse-node";
import { PunctuationNode } from "./punctuation-node";

export class DotBefore extends AbstractSequence {
  node: ParseNode;

  constructor(node: ParseNode) {
    super();
    this.node = node;
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new PunctuationNode(DOT));
      this.addElement(this.node);
      super.parseText(text);
    }
  }
}
