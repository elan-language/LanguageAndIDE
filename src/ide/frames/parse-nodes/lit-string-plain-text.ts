import { escapeHtmlChars } from "../frame-helpers";
import { File } from "../frame-interfaces/file";
import { AbstractParseNode } from "./abstract-parse-node";
import { matchRegEx } from "./parse-node-helpers";

export class LitStringPlainText extends AbstractParseNode {
  constructor(file: File) {
    super(file);
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      [this.status, this.matchedText, this.remainingText] = matchRegEx(text, /^[^"\{]+/);
    }
  }

  renderAsHtml(): string {
    const contents =
      this.matchedText.length > 0 ? `<el-lit>${escapeHtmlChars(this.matchedText)}</el-lit>` : ``;
    return this.isValid() ? contents : this.matchedText;
  }

  override renderAsElanSource(): string {
    return this.matchedText;
  }


  override renderAsExport(): string {
    return this.matchedText;
  }
}
