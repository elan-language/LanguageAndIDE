import { AbstractSequence } from "./abstract-sequence";
import { CSV } from "./csv";

export class TypeTupleNode extends AbstractSequence {
  types: CSV | undefined;
  tupleTypeName: string = "";

  parseText(text: string): void {
    if (text.trim().length > 0) {
      this.file.language().addNodesForTypeTuple(this);
      super.parseText(text);
    }
  }

  renderAsHtml(): string {
    return this.isValid() ? this.file.language().typeTupleAsHtml(this) : this.matchedText;
  }

  override renderAsExport(): string {
    return this.isValid() ? super.renderAsExport() : this.matchedText;
  }
}
