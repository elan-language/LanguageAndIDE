import { ParseNode } from "../frame-interfaces/parse-node";
import { CLOSE_SQ_BRACKET, OPEN_SQ_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { Space } from "./parse-node-helpers";
import { PunctuationNode } from "./punctuation-node";
import { SpaceNode } from "./space-node";
import { File } from "../frame-interfaces/file";

export class ListNode extends AbstractSequence {
  csv: CSV | undefined;
  elementConstructor: () => ParseNode;

  constructor(file: File, elementConstructor: () => ParseNode) {
    super(file);
    this.elementConstructor = elementConstructor;
  }

  parseText(text: string): void {
    if (text.length > 0) {
      this.addElement(new PunctuationNode(this.file, OPEN_SQ_BRACKET));
      this.csv = new CSV(this.file, this.elementConstructor, 1);
      this.addElement(this.csv);
      this.addElement(new SpaceNode(this.file, Space.ignored));
      this.addElement(new PunctuationNode(this.file, CLOSE_SQ_BRACKET));
      super.parseText(text);
    }
  }

  override renderAsHtml(): string {
    const fromLanguage = this.file.language().renderNodeAsHtml(this);
    return fromLanguage.length > 0 ? fromLanguage : super.renderAsHtml();
  }
}
