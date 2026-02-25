import { matchesKeyword } from "../../../compiler/keywords";
import { Regexes } from "../fields/regexes";
import { File } from "../frame-interfaces/file";
import { ParseStatus } from "../status-enums";
import { TokenType } from "../symbol-completion-helpers";
import { AbstractParseNode } from "./abstract-parse-node";
import { matchRegEx } from "./parse-node-helpers";

export class IdentifierUse extends AbstractParseNode {
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
    this.completionWhenEmpty = this.getCompletionFromLangOr("<i>name</i>");
  }

  parseText(text: string): void {
    this.remainingText = text;
    if (text.length > 0) {
      [this.status, this.matchedText, this.remainingText] = matchRegEx(
        text.trimStart(),
        Regexes.identifier,
      );
    }
    if (this.isValid() && this.remainingText.length > 0) {
      if (matchesKeyword(this.matchedText)) {
        this.status = ParseStatus.invalid;
      } else {
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
    return `<el-id>${this.renderAsElanSource()}</el-id>`;
  }
}
