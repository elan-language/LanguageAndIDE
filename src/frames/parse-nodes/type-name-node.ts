import { TokenType } from "../symbol-completion-helpers";
import { RegExMatchNode } from "./regex-match-node";

export class TypeNameNode extends RegExMatchNode {
  tokenTypes: Set<TokenType> = new Set<TokenType>();

  constructor(
    tokenTypes: Set<TokenType> = new Set<TokenType>([
      TokenType.type_abstract,
      TokenType.type_concrete,
      TokenType.type_notInheritable,
      TokenType.type_enum,
    ]),
  ) {
    super(/^\s*[A-Z]\w*/);
    this.completionWhenEmpty = "<i>Type</i>";
    this.tokenTypes = tokenTypes;
  }
  renderAsHtml(): string {
    return `<el-type>${this.renderAsSource()}</el-type>`;
  }

  symbolCompletion_tokenTypes(): Set<TokenType> {
    return this.tokenTypes;
  }
}
