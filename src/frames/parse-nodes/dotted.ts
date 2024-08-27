import { DOT } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { ParseNode } from "./parse-node";
import { PunctuationNode } from "./punctuation-node";

// A node followed by a '.'
export class Dotted extends AbstractSequence {
  qualifier: ParseNode;

  constructor(qual: ParseNode) {
    super();
    this.qualifier = qual;
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(this.qualifier);
      this.addElement(new PunctuationNode(DOT));
      super.parseText(text);
    }
  }
}
