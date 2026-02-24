import { escapeHtmlChars, removeHtmlTagsAndEscChars } from "../frame-helpers";
import { File } from "../frame-interfaces/file";
import { Language } from "../frame-interfaces/language";
import { ParseStatus } from "../status-enums";
import { DIVIDE, MULT } from "../symbols";
import { AbstractParseNode } from "./abstract-parse-node";

export class Operator extends AbstractParseNode {
  elanOp: string;
  langOp: (lang: Language) => string;

  constructor(file: File, elanOp: string, langOp?: (lang: Language) => string) {
    super(file);
    this.elanOp = elanOp;
    this.langOp = langOp ? langOp : (lang) => (lang ? elanOp : elanOp);
    this.completionWhenEmpty = this.getCompletionFromLangOr("");
  }

  parseText(text: string): void {
    if (text.length > 0) {
      const langOp = this.langOp(this.file.language());
      const trimmed = text.trimStart();
      if (trimmed.startsWith(langOp)) {
        const n = this.numLeadingSpaces(text) + langOp.length;
        this.set(ParseStatus.valid, text.substring(0, n), text.substring(n));
        this._done = true;
      } else if (langOp.startsWith(trimmed)) {
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
    const langOp = this.langOp(this.file.language());
    let text = langOp;
    if (text.includes(`<`) || text.includes(`>`)) {
      text = escapeHtmlChars(langOp);
    }
    const alpha = /^[a-zA-Z]/;
    const kw = alpha.test(text);
    const closePacked = langOp === MULT || langOp === DIVIDE;
    const open = kw ? "<el-kw>" : "";
    const close = kw ? "</el-kw>" : "";
    const space = closePacked ? "" : " ";
    return `${open}${space}${text}${space}${close}`;
  }

  renderAsExport(): string {
    return this.status === ParseStatus.valid
      ? `${removeHtmlTagsAndEscChars(this.renderAsHtml())}`
      : this.matchedText;
  }
}
