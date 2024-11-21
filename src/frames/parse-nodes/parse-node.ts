import { SymbolCompletionSpec, SymbolCompletionSpec_Old, TokenType } from "../helpers";
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

  getSyntaxCompletionAsHtml(): string;
  setSyntaxCompletionWhenEmpty(ph: string): void;

  //Temporary duplication: 'old' eventually to be removed
  symbolCompletion_getSpec_Old(): SymbolCompletionSpec_Old;

  symbolCompletion_getSpec(): SymbolCompletionSpec;
  symbolCompletion_tokenTypes(): Set<TokenType>;
  symbolCompleton_keywords(): string[];
  symbolCompleton_constraintId(): string;
  symbolCompleton_toMatch(): string;

  getActiveNode(): ParseNode;
  isDone(): boolean;
  isValid(): boolean;
  isIncomplete(): boolean;
  isEmpty(): boolean;
  isInvalid(): boolean;
}
