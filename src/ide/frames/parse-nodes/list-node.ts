import { removeHtmlTagsAndEscChars } from "../frame-helpers";
import { File } from "../frame-interfaces/file";
import { ParseNode } from "../frame-interfaces/parse-node";
import { ParseStatus } from "../status-enums";
import { CLOSE_SQ_BRACKET, OPEN_SQ_BRACKET } from "../symbols";
import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";

export class ListNode extends AbstractSequence {
  csv: CSV | undefined;
  elementConstructor: () => ParseNode;

  constructor(file: File, elementConstructor: () => ParseNode) {
    super(file);
    this.elementConstructor = elementConstructor;
  }

  parseText(text: string): void {
    if (text.trim().length > 0) {
      this.file.language().addNodesForList(this);
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
    return this.isValid() ? lang.listAsHtml(this) : this.matchedText;
  }

  override renderAsExport(): string {
    const lang = this.file.language();
    return this.isValid() ? removeHtmlTagsAndEscChars(lang.listAsHtml(this)) : this.matchedText;
  }
}
