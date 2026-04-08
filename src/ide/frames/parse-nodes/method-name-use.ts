import { Regexes } from "../fields/regexes";
import { File } from "../frame-interfaces/file";
import { ParseStatus } from "../status-enums";
import { TokenType } from "../symbol-completion-helpers";
import { AbstractParseNode } from "./abstract-parse-node";
import { matchRegEx } from "./parse-node-helpers";

export class MethodNameUse extends AbstractParseNode {
  private tokenTypes: Set<TokenType>;
  private contextGenerator: () => string;

  constructor(
    file: File,
    tokenTypes: Set<TokenType> = new Set<TokenType>(),
    contextGenerator = () => "",
  ) {
    super(file);
    this.tokenTypes = tokenTypes;
    this.contextGenerator = contextGenerator;
    this.completionWhenEmpty = "<i>name</i>";
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      [this.status, this.matchedText, this.remainingText] = matchRegEx(
        text.trimStart(),
        Regexes.identifier,
      );
    }
    if (this.isValid()) {
      if ( this.matchedText === "pow") {
        this.status = ParseStatus.invalid;
        this.matchedText = "";
        this.remainingText = text;
      } else if (this.remainingText.length > 0) {
        this._done = true;
      }
    }
  }

  symbolCompletion_tokenTypes(): Set<TokenType> {
    return this.tokenTypes;
  }

  symbolCompletion_context(): string {
    return this.contextGenerator();
  }

  override renderAsHtml(): string {
    return `<el-method>${this.matchedText.trim()}</el-method>`;
  }
}
