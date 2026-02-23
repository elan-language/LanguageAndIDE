import { File } from "../frame-interfaces/file";
import { ParseStatus } from "../status-enums";
import { AbstractParseNode } from "./abstract-parse-node";

export class Operator extends AbstractParseNode {
  elanOp: string;
  langOp: string;

  constructor(file: File, elanOp: string, langOp: string) {
    super(file);
    this.elanOp = elanOp;
    this.langOp = langOp;
    this.completionWhenEmpty = langOp;
  }

  parseText(text: string): void {
    if (text.length > 0) {
      const trimmed = text.trimStart();
      if (trimmed.startsWith(this.langOp)) {
        const n = this.numLeadingSpaces(text) + this.langOp.length;
        this.set(ParseStatus.valid, text.substring(0, n), text.substring(n));
        this._done = true;
      } else if (this.langOp.startsWith(trimmed)) {
        this.set(ParseStatus.incomplete, text, "");
      } else {
        this.set(ParseStatus.invalid, "", text);
      }
    }
  }

  renderAsElanSource(): string {
    return this.elanOp + " ";
  }

  renderAsHtml(): string {
    return this.langOp + " ";
  }
}
