import { ParseNode } from "../frame-interfaces/parse-node";
import { CLOSE_SQ_BRACKET, OPEN_SQ_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { Space } from "./parse-node-helpers";
import { PunctuationNode } from "./punctuation-node";
import { SpaceNode } from "./space-node";

export class ListNode extends AbstractSequence {
  csv: CSV | undefined;
  elementConstructor: () => ParseNode;

  constructor(elementConstructor: () => ParseNode) {
    super();
    this.elementConstructor = elementConstructor;
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new PunctuationNode(OPEN_SQ_BRACKET));
      this.csv = new CSV(this.elementConstructor, 1);
      this.addElement(this.csv);
      this.addElement(new SpaceNode(Space.ignored));
      this.addElement(new PunctuationNode(CLOSE_SQ_BRACKET));
      super.parseText(text);
    }
  }
}
