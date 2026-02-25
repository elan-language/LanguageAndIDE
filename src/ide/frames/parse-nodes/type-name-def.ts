import { Regexes } from "../fields/regexes";
import { File } from "../frame-interfaces/file";
import { ParseStatus } from "../status-enums";
import { TokenType } from "../symbol-completion-helpers";
import { AbstractParseNode } from "./abstract-parse-node";
import { matchRegEx } from "./parse-node-helpers";

export class TypeNameDef extends AbstractParseNode {
  tokenTypes: Set<TokenType> = new Set<TokenType>();
  elanTypeName: string = "";

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
    this.completionWhenEmpty = this.getCompletionFromLangOr("<i>Type</i>");
    this.tokenTypes = tokenTypes;
  }

  private langInt = RegExp(`^\\s*${this.file.language().INT_NAME}`);
  private langFloat = RegExp(`^\\s*${this.file.language().FLOAT_NAME}`);
  private langBool = RegExp(`^\\s*${this.file.language().BOOL_NAME}`);
  private langString = RegExp(`^\\s*${this.file.language().STRING_NAME}`);
  private langList = RegExp(`^\\s*${this.file.language().LIST_NAME}`);

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      [this.status, this.matchedText, this.remainingText] = matchRegEx(text, this.langInt);
      this.elanTypeName = "Int";
      if (this.status !== ParseStatus.valid) {
        [this.status, this.matchedText, this.remainingText] = matchRegEx(text, this.langFloat);
        this.elanTypeName = "Float";
      }
      if (this.status !== ParseStatus.valid) {
        [this.status, this.matchedText, this.remainingText] = matchRegEx(text, this.langBool);
        this.elanTypeName = "Boolean";
      }
      if (this.status !== ParseStatus.valid) {
        [this.status, this.matchedText, this.remainingText] = matchRegEx(text, this.langString);
        this.elanTypeName = "String";
      }
      if (this.status !== ParseStatus.valid) {
        [this.status, this.matchedText, this.remainingText] = matchRegEx(text, this.langList);
        this.elanTypeName = "List";
      }
  
      if (this.status !== ParseStatus.valid) {
        [this.status, this.matchedText, this.remainingText] = matchRegEx(
          text,
          Regexes.typeSimpleName,
        );
        this.elanTypeName = this.matchedText;
      }
    }
  }
  renderAsHtml(): string {
    return `<el-type>${this.renderAsExport()}</el-type>`;
  }

  symbolCompletion_tokenTypes(): Set<TokenType> {
    return this.tokenTypes;
  }

  override renderAsExport(): string {
    const lang = this.file.language();
    const elan = this.elanTypeName;
    let target = elan;
    if (elan === "Int") {
      target = lang.INT_NAME;
    } else if (elan === "Float") {
      target = lang.FLOAT_NAME;
    } else if (elan === "Boolean") {
      target = lang.BOOL_NAME;
    } else if (elan === "String") {
      target = lang.STRING_NAME;
    } else if (elan === "List") {
      target = lang.LIST_NAME;
    }
    return target;
  }
}
