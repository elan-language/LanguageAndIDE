import { Regexes } from "../fields/regexes";
import { RegExMatchNode } from "./regex-match-node";

export class LitInt extends RegExMatchNode {
  constructor() {
    super(Regexes.negatableLitInt);
    this.completionWhenEmpty = "<i>integer value </i>";
  }

  renderAsHtml(): string {
    return `<el-lit>${super.renderAsHtml()}</el-lit>`;
  }

  renderAsSource(): string {
    return super.renderAsSource().trim();
  }
}
