import { ParseStatus } from "../status-enums";
import { AbstractParseNode } from "./abstract-parse-node";

export class LitBoolean extends AbstractParseNode {
  value: boolean = false; // i.e. indicates whether it is literal true or literal false (assuming parse Valid)

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      const textUC = text.toUpperCase();
      const TRUE = "TRUE";
      const FALSE = "FALSE";
      if (textUC.startsWith(TRUE)) {
        this.value = true;
        this.matchedText = text.substring(0, 4);
        this.remainingText = text.substring(4);
        this.status = ParseStatus.valid;
        this._done = true;
      } else if (textUC.startsWith(FALSE)) {
        this.value = false;
        this.matchedText = text.substring(0, 5);
        this.remainingText = text.substring(5);
        this.status = ParseStatus.valid;
        this._done = true;
      } else if (TRUE.startsWith(textUC) || FALSE.startsWith(textUC)) {
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
    return this.isValid()
      ? `<el-kw>${this.value ? lang.TRUE : lang.FALSE}</el-kw>`
      : this.matchedText;
  }

  renderAsElanSource(): string {
    return this.value ? "true" : "false";
  }
}
