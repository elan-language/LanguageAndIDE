import { Regexes } from "../fields/regexes";
import { TokenType } from "../symbol-completion-helpers";
import { RegExMatchNode } from "./regex-match-node";

export class TypeSimpleName extends RegExMatchNode {
  tokenTypes: Set<TokenType> = new Set<TokenType>();

  constructor(
    tokenTypes: Set<TokenType> = new Set<TokenType>([
      TokenType.type_abstract,
      TokenType.type_concrete,
      TokenType.type_notInheritable,
      TokenType.type_enum,
    ]),
  ) {
    super(Regexes.typeSimpleName);
    this.completionWhenEmpty = "<i>Type</i>";
    this.tokenTypes = tokenTypes;
  }
  renderAsHtml(): string {
    return `<el-type>${this.renderAsElanSource()}</el-type>`;
  }

  symbolCompletion_tokenTypes(): Set<TokenType> {
    return this.tokenTypes;
  }
}
