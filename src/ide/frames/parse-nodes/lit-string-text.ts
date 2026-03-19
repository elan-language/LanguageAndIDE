import { escapeHtmlChars } from "../frame-helpers";
import { File } from "../frame-interfaces/file";
import { RegExMatchNode } from "./regex-match-node";

export class LitStringText extends RegExMatchNode {
  constructor(file: File, constraints: RegExp) {
    super(file, constraints);
  }

  renderAsHtml(): string {
    const contents =
      this.matchedText.length > 0 ? `<el-lit>${escapeHtmlChars(this.matchedText)}</el-lit>` : ``;
    return this.isValid() ? contents : this.matchedText;
  }

  override renderAsExport(): string {
    return this.matchedText;
  }
}
