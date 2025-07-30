import { TokenType } from "../symbol-completion-helpers";
import { RegExMatchNode } from "./regex-match-node";

export class TypeSpecificFuncNode extends RegExMatchNode {
  constructor() {
    super(/^\s*Func/);
    this.completionWhenEmpty = "<i>Func</i>";
  }
  renderAsHtml(): string {
    return `<el-type>${this.renderAsSource()}</el-type>`;
  }

  symbolCompletion_tokenTypes(): Set<TokenType> {
    return new Set<TokenType>();
  }
}
