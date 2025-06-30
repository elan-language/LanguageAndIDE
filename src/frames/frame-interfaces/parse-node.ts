import { ParseStatus } from "../status-enums";
import { KeywordCompletion, SymbolCompletionSpec, TokenType } from "../symbol-completion-helpers";

export interface ParseNode {
  status: ParseStatus;
  matchedText: string;
  remainingText: string;

  parseText(text: string): void;

  renderAsHtml(): string;
  renderAsSource(): string;

  getSyntaxCompletionAsHtml(): string;
  setSyntaxCompletionWhenEmpty(ph: string): void;

  symbolCompletion_getSpec(): SymbolCompletionSpec;
  symbolCompletion_tokenTypes(): Set<TokenType>;
  symbolCompletion_keywords(): Set<KeywordCompletion>;
  symbolCompletion_context(): string;
  symbolCompletion_toMatch(): string;

  getActiveNode(): ParseNode;
  isDone(): boolean;
  isValid(): boolean;
  isIncomplete(): boolean;
  isEmpty(): boolean;
  isInvalid(): boolean;
}
