import { TokenType } from "../helpers";
import { RegExMatchNode } from "./regex-match-node";

export class TypeSimpleNode extends RegExMatchNode {
  tokenTypes: TokenType[] = [];

  constructor(tokenTypes: TokenType[]) {
    super(/^\s*[A-Z]\w*/);
    this.completionWhenEmpty = "<i>Type</i>";
    this.tokenTypes = tokenTypes;
  }
  renderAsHtml(): string {
    return `<el-type>${this.renderAsSource()}</el-type>`;
  }

  symbolCompletion_tokenTypes(): TokenType[] {
    return this.tokenTypes;
  }
}
