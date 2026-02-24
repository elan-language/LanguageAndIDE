import { File } from "../frame-interfaces/file";
import { ParseNode } from "../frame-interfaces/parse-node";
import { ParseStatus } from "../status-enums";
import { CLOSE_SQ_BRACKET, OPEN_SQ_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";
import { Space } from "./parse-node-helpers";
import { PunctuationNode } from "./punctuation-node";
import { SpaceNode } from "./space-node";

export class ListNode extends AbstractSequence {
  csv: CSV | undefined;
  elementConstructor: () => ParseNode;

  constructor(file: File, elementConstructor: () => ParseNode) {
    super(file);
    this.elementConstructor = elementConstructor;
  }

  parseText(text: string): void {
    if (text.length > 0) {
      const lang = this.file.language();
      this.addElement(new PunctuationNode(this.file, lang.LIST_START));
      this.csv = new CSV(this.file, this.elementConstructor, 1);
      this.addElement(this.csv);
      this.addElement(new SpaceNode(this.file, Space.ignored));
      this.addElement(new PunctuationNode(this.file, lang.LIST_END));
      super.parseText(text);
    }
  }

  override renderAsElanSource() {
    return this.status === ParseStatus.valid
      ? `${OPEN_SQ_BRACKET}${this.csv!.renderAsElanSource()}${CLOSE_SQ_BRACKET}`
      : this.matchedText;
  }

  override renderAsHtml(): string {
    const lang = this.file.language();
    return `${lang.LIST_START}${this.csv?.renderAsHtml()}${lang.LIST_END}`;
  }
}
