import { File } from "../frame-interfaces/file";
import { ParseStatus } from "../status-enums";
import { TokenType } from "../symbol-completion-helpers";
import { AbstractParseNode } from "./abstract-parse-node";
import { matchRegEx } from "./parse-node-helpers";

export class TestName extends AbstractParseNode {
  private tokenTypes: Set<TokenType>;
  private contextGenerator: () => string;

  private prefix = "test_";

  constructor(
    file: File,
    tokenTypes: Set<TokenType> = new Set<TokenType>(),
    contextGenerator = () => "",
  ) {
    super(file);
    this.tokenTypes = tokenTypes;
    this.contextGenerator = contextGenerator;
  }

  parseText(text: string): void {
    if (text.length === 0 || this.prefix.startsWith(text)) {
      text = this.prefix;
      this.status = ParseStatus.incomplete;
      this.matchedText = text;
      this.remainingText = "";
    } else {
      if (!text.startsWith(this.prefix)) {
        text = this.prefix + text;
      }
      [this.status, this.matchedText, this.remainingText] = matchRegEx(
        text.trimStart(),
        /test_[a-zA-Z0-9_]+/,
      );
    }

    if (this.isValid() && this.remainingText.length > 0) {
      this._done = true;
    }
  }
  symbolCompletion_tokenTypes(): Set<TokenType> {
    return this.tokenTypes;
  }

  symbolCompletion_context(): string {
    return this.contextGenerator();
  }

  override renderAsHtml(): string {
    return this.isValid() ? `<el-method>${this.matchedText.trim()}</el-method>` : this.matchedText;
  }
}
