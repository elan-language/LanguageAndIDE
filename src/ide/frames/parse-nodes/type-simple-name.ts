import { File } from "../frame-interfaces/file";
import { TokenType } from "../symbol-completion-helpers";
import { AbstractParseNode } from "./abstract-parse-node";
import { matchRegEx } from "./parse-node-helpers";

export class TypeSimpleName extends AbstractParseNode {
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
    super(file);
    this.completionWhenEmpty = "<i>Type</i>";
    this.tokenTypes = tokenTypes;
  }


  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      const lang = this.file.language();
      const rgx: string = `^\\s*${lang.INT_NAME}|^\\s*${lang.FLOAT_NAME}|^\\s*${lang.BOOL_NAME}|^\\s*${lang.STRING_NAME}|^\\s*${lang.LIST_NAME}|^\\s*[A-Z]\\w*`;
      [this.status, this.matchedText, this.remainingText] = matchRegEx(text, new RegExp(rgx));
    }
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
