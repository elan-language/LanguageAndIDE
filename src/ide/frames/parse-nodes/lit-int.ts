import { Regexes } from "../fields/regexes";
import { File } from "../frame-interfaces/file";
import { RegExMatchNode } from "./regex-match-node";

export class LitInt extends RegExMatchNode {
  constructor(file: File) {
    super(file, Regexes.negatableLitInt);
    this.completionWhenEmpty = this.getCompletionFromLangOr("<i>integer value </i>");
  }

  renderAsHtml(): string {
    return `<el-lit>${super.renderAsHtml()}</el-lit>`;
  }

  renderAsElanSource(): string {
    return super.renderAsElanSource().trim();
  }
}
