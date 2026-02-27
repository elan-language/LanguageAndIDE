import { ParseStatus } from "../status-enums";
import { AbstractParseNode } from "./abstract-parse-node";

export class LitBoolean extends AbstractParseNode {
  value: boolean = false; // i.e. indicates whether it is literal true or literal false (assuming parse Valid)

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      if (text === this.langTrue) {
        this.value = true;
        this.matchedText = this.langTrue;
        this.remainingText = text.substring(4);
        this.status = ParseStatus.valid;
      } else if (text === this.langFalse) {
        this.value = false;
        this.matchedText = this.langFalse;
        this.remainingText = text.substring(5);
        this.status = ParseStatus.valid;
      } else {
        this.status = ParseStatus.invalid;
      }
    }
  }

  langTrue: string = this.file.language().TRUE;
  langFalse: string = this.file.language().TRUE;

  renderAsHtml(): string {
    return `<el-kw>${this.value ? this.langTrue : this.langFalse}</el-kw>`;
  }

  renderAsElanSource(): string {
    return this.value ? "true" : "false";
  }
}
