import { ParseNode } from "../frame-interfaces/parse-node";
import { DOT } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { PunctuationNode } from "./punctuation-node";
import { File } from "../frame-interfaces/file";

export class DotAfter extends AbstractSequence {
  node: ParseNode;

  constructor(file: File, node: ParseNode) {
    super(file);
    this.node = node;
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(this.node);
      this.addElement(new PunctuationNode(this.file, DOT));
      super.parseText(text);
    }
  }
}
