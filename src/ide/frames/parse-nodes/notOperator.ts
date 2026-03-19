import { notKeyword } from "../../../compiler/elan-keywords";
import { removeHtmlTagsAndEscChars } from "../frame-helpers";
import { File } from "../frame-interfaces/file";
import { Language } from "../frame-interfaces/language";
import { ParseStatus } from "../status-enums";
import { AbstractParseNode } from "./abstract-parse-node";

export class NotOperator extends AbstractParseNode {
  elanOp: string = notKeyword;
  langOp: (lang: Language) => string;

  constructor(file: File, langOp?: (lang: Language) => string) {
    super(file);
    this.langOp = langOp ? langOp : (lang) => (lang ? this.elanOp : this.elanOp);
    this.completionWhenEmpty = this.getCompletionFromLangOr("");
  }

  parseText(text: string): void {
    if (text.length > 0) {
      let langOp = this.langOp(this.file.language());
      langOp = /^[a-zA-Z]/.test(langOp) ? langOp + " " : langOp;
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
      if (this.status === ParseStatus.valid && this.numLeadingSpaces(this.remainingText) > 0) {
        const n = this.numLeadingSpaces(text);
        this.set(ParseStatus.valid, text.substring(0, n), text.substring(n));
      }
    }
  }

  notIsKeyword(): boolean {
    const langOp = this.langOp(this.file.language());
    return /^[a-zA-Z]/.test(langOp);
  }

  renderAsElanSource(): string {
    return `${this.elanOp} `;
  }

  renderAsHtml(): string {
    let html = this.matchedText;
    if (this.status === ParseStatus.valid) {
      const langOp = this.langOp(this.file.language());
      const kw = this.notIsKeyword();
      const open = kw ? "<el-kw>" : "";
      const close = kw ? "</el-kw> " : ""; //Note the appended space
      html = `${open}${langOp}${close}`;
    }
    return html;
  }

  renderAsExport(): string {
    return this.isValid() ? `${removeHtmlTagsAndEscChars(this.renderAsHtml())}` : this.matchedText;
  }
}
