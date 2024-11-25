import { ParseStatus } from "../status-enums";
import { SymbolCompletionSpec, TokenType } from "../symbol-completion-helpers";

export interface ParseNode {
  status: ParseStatus;
  matchedText: string;
  remainingText: string;
  errorMessage: string;

  parseText(text: string): void;

  renderAsHtml(): string;
  renderAsSource(): string;
  compile(): string;

  getSyntaxCompletionAsHtml(): string;
  setSyntaxCompletionWhenEmpty(ph: string): void;

  symbolCompletion_getSpec(): SymbolCompletionSpec;
  symbolCompletion_tokenTypes(): Set<TokenType>;
  symbolCompletion_keywords(): Set<string>;
  symbolCompletion_constraintId(): string;
  symbolCompletion_toMatch(): string;

  getActiveNode(): ParseNode;
  isDone(): boolean;
  isValid(): boolean;
  isIncomplete(): boolean;
  isEmpty(): boolean;
  isInvalid(): boolean;
}
