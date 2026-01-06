import { Regexes } from "../fields/regexes";
import { RegExMatchNode } from "./regex-match-node";
import { File } from "../frame-interfaces/file";

export class LitInt extends RegExMatchNode {
  constructor(file: File) {
    super(file, Regexes.negatableLitInt);
    this.completionWhenEmpty = "<i>integer value </i>";
  }

  renderAsHtml(): string {
    return `<el-lit>${super.renderAsHtml()}</el-lit>`;
  }

  renderAsElanSource(): string {
    return super.renderAsElanSource().trim();
  }
}
