import { TokenType } from "../symbol-completion-helpers";
import { RegExMatchNode } from "./regex-match-node";
import { File } from "../frame-interfaces/file";

export class TypeSpecificFuncNode extends RegExMatchNode {
  constructor(file: File) {
    super(file, /^\s*Func/);
    this.completionWhenEmpty = "<i>Func</i>";
  }
  renderAsHtml(): string {
    return `<el-type>${this.renderAsElanSource()}</el-type>`;
  }

  symbolCompletion_tokenTypes(): Set<TokenType> {
    return new Set<TokenType>();
  }
}
