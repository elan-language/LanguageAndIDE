import { escapeHtmlChars } from "../frame-helpers";
import { File } from "../frame-interfaces/file";
import { ParseStatus } from "../status-enums";
import { MULT, DIVIDE } from "../symbols";
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
    const closePacked = this.elanOp === MULT || this.elanOp === DIVIDE;
    const space = closePacked ? "" : " ";
    return `${space}${this.elanOp}${space}`;
  }

  renderAsHtml(): string {
    let text = this.langOp;
    if (text.includes(`<`) || text.includes(`>`)) {
     text = escapeHtmlChars(this.langOp);
    }
    const alpha = /^[a-zA-Z]/;
    const kw = alpha.test(text);
    const closePacked = this.langOp === MULT || this.langOp === DIVIDE;
    const open = kw ? "<el-kw>" : "";
    const close = kw ? "</el-kw>" : "";
    const space = closePacked ? "" : " ";
    return `${open}${space}${text}${space}${close}`;
  }
}
