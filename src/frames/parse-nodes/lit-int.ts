import { Regexes } from "../fields/regexes";
import { ParseStatus } from "../status-enums";
import { AbstractParseNode } from "./abstract-parse-node";
import { matchRegEx } from "./parse-node-helpers";

export class LitInt extends AbstractParseNode {
  constructor() {
    super();
    this.completionWhenEmpty = "<i>integer value </i>";
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      [this.status, this.matchedText, this.remainingText] = matchRegEx(
        text,
        Regexes.negatableLitInt,
      );
      if (this.status === ParseStatus.valid && this.remainingText.length > 0) {
        this._done = true;
      }
    }
  }

  renderAsHtml(): string {
    return `<el-lit>${super.renderAsHtml()}</el-lit>`;
  }
}
