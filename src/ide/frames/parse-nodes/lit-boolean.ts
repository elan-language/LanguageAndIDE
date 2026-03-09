import { ParseStatus } from "../status-enums";
import { AbstractParseNode } from "./abstract-parse-node";

export class LitBoolean extends AbstractParseNode {
  value: boolean = false; // i.e. indicates whether it is literal true or literal false (assuming parse Valid)

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      const lang = this.file.language();

      //TODO what's missing here is if the target starts with the text e.g. for first character only
      if (text.startsWith(lang.TRUE)) {
        this.value = true;
        this.matchedText = lang.TRUE;
        this.remainingText = text.substring(4);
        this.status = ParseStatus.valid;
        this._done = true;
      } else if (text.startsWith(lang.FALSE)) {
        this.value = false;
        this.matchedText = lang.FALSE;
        this.remainingText = text.substring(5);
        this.status = ParseStatus.valid;
        this._done = true;
      } else if (lang.TRUE.startsWith(text) || lang.FALSE.startsWith(text)) {
        this.matchedText = text;
        this.remainingText = "";
        this.status = ParseStatus.incomplete;
      } else {
        this.status = ParseStatus.invalid;
      }
    }
  }

  renderAsHtml(): string {
    const lang = this.file.language();
    const valid = this.status === ParseStatus.valid;
    return `<el-kw>${valid ? (this.value ? lang.TRUE : lang.FALSE) : this.matchedText}</el-kw>`;
  }

  renderAsElanSource(): string {
    return this.value ? "true" : "false";
  }
}
