import { TokenType } from "../helpers";
import { ParseStatus } from "../status-enums";

export interface ParseNode {
  status: ParseStatus;
  matchedText: string;
  remainingText: string;
  errorMessage: string;

  parseText(text: string): void;

  renderAsHtml(): string;
  renderAsSource(): string;
  compile(): string;

  getCompletionAsHtml(): string;
  setCompletionWhenEmpty(ph: string): void;

  getToMatchAndTokenType(): [string, TokenType];
  getActiveNode(): ParseNode;
}
