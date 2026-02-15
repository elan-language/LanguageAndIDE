import { Regexes } from "../fields/regexes";
import { File } from "../frame-interfaces/file";
import { TokenType } from "../symbol-completion-helpers";
import { RegExMatchNode } from "./regex-match-node";

export class TypeSimpleName extends RegExMatchNode {
  tokenTypes: Set<TokenType> = new Set<TokenType>();

  constructor(
    file: File,
    tokenTypes: Set<TokenType> = new Set<TokenType>([
      TokenType.type_abstract,
      TokenType.type_concrete,
      TokenType.type_notInheritable,
      TokenType.type_enum,
    ]),
  ) {
    super(file, Regexes.typeSimpleName);
    this.completionWhenEmpty = "<i>Type</i>";
    this.tokenTypes = tokenTypes;
  }
  renderAsHtml(): string {
    return `<el-type>${this.matchedText}</el-type>`;
  }

  symbolCompletion_tokenTypes(): Set<TokenType> {
    return this.tokenTypes;
  }

  elanSimpleTypeName(): string {
    const lang = this.file.language();
    const text = this.matchedText;
    let elan = text;
    if (text === lang.INT_NAME) {
      elan = "Int";
    } else if (text === lang.FLOAT_NAME) {
      elan = "Float";
    } else if (text === lang.BOOL_NAME) {
      elan = "Boolean";
    } else if (text === lang.STRING_NAME) {
      elan = "String";
    } else if (text === lang.LIST_NAME) {
      elan = "List";
    }
    return elan;
  }
}
