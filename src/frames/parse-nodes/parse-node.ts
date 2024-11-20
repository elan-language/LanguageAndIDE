import { SymbolCompletionSpec, TokenType } from "../helpers";
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
  getSymbolCompletionSpec(): SymbolCompletionSpec;
  getSymbolCompletionSpecOld(): SymbolCompletionSpec;
  getApplicableTokenTypes(): TokenType[];
  getKeywordsForSymbolComplete(): string[];

  getActiveNode(): ParseNode;
  isDone(): boolean;
  isValid(): boolean;
  isIncomplete(): boolean;
  isEmpty(): boolean;
  isInvalid(): boolean;
}
