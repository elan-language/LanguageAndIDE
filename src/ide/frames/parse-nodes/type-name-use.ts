import { ReservedWords } from "../../../compiler/reserved-words";
import { Regexes } from "../fields/regexes";
import { File } from "../frame-interfaces/file";
import { ParseStatus } from "../status-enums";
import { TokenType } from "../symbol-completion-helpers";
import { AbstractParseNode } from "./abstract-parse-node";
import { matchRegEx } from "./parse-node-helpers";

export class TypeNameUse extends AbstractParseNode {
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
    this.completionWhenEmpty = "<i>Type</i>";
    this.tokenTypes = tokenTypes;
  }

  private attemptToMatchStandardType(text: string, langName: string, elanName: string) {
    if (text.startsWith(langName)) {
      this.status = ParseStatus.valid;
      this.matchedText = langName;
      this.remainingText = text.substring(langName.length);
      this.elanTypeName = elanName;
    } else if (text.length === 0 || langName.startsWith(text)) {
      this.status = ParseStatus.incomplete;
      this.matchedText = text;
      this.remainingText = "";
      this.elanTypeName = text;
    } else {
      this.status = ParseStatus.invalid;
    }
  }

  parseText(text: string): void {
    this.remainingText = text;
    const lang = this.file.language();
    if (text.length > 0) {
      this.attemptToMatchStandardType(text, lang.INT_NAME, "Int");
      if (this.status === ParseStatus.invalid) {
        this.attemptToMatchStandardType(text, lang.FLOAT_NAME, "Float");
      }
      if (this.status === ParseStatus.invalid) {
        this.attemptToMatchStandardType(text, lang.BOOL_NAME, "Boolean");
      }
      if (this.status === ParseStatus.invalid) {
        this.attemptToMatchStandardType(text, lang.STRING_NAME, "String");
      }
      if (this.status === ParseStatus.invalid) {
        this.attemptToMatchStandardType(text, lang.LIST_NAME, "List");
      }
      if (this.status === ParseStatus.invalid) {
        [this.status, this.matchedText, this.remainingText] = matchRegEx(
          text,
          Regexes.typeSimpleName,
        );
        this.elanTypeName = this.matchedText;
        if (ReservedWords.Instance.matchesIgnoringCase(this.matchedText)) {
          this.status = ParseStatus.invalid;
          this.matchedText = "";
          this.message = `matches a reserved word.`;
        }
      }

    }
  }
  renderAsHtml(): string {
    return `<el-type>${this.renderAsExport()}</el-type>`;
  }

  renderAsElanSource(): string {
    return this.elanTypeName;
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
