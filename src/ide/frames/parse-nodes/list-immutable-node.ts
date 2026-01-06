import { ParseNode } from "../frame-interfaces/parse-node";
import { CLOSE_BRACE, OPEN_BRACE } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { Space } from "./parse-node-helpers";
import { PunctuationNode } from "./punctuation-node";
import { SpaceNode } from "./space-node";
import { File } from "../frame-interfaces/file";

export class ListImmutableNode extends AbstractSequence {
  csv: CSV | undefined;
  elementConstructor: () => ParseNode;

  constructor(file: File, elementConstructor: () => ParseNode) {
    super(file);
    this.elementConstructor = elementConstructor;
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new PunctuationNode(this.file, OPEN_BRACE));
      this.csv = new CSV(this.file, this.elementConstructor, 1);
      this.addElement(this.csv);
      this.addElement(new SpaceNode(this.file, Space.ignored));
      this.addElement(new PunctuationNode(this.file, CLOSE_BRACE));
      super.parseText(text);
    }
  }
}
