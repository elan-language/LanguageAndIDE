import { SymbolCompletionSpec } from "../helpers";
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

  getSymbolCompletionSpec(): SymbolCompletionSpec;
  getActiveNode(): ParseNode;
  isDone(): boolean;
  isValid(): boolean;
  isIncomplete(): boolean;
  isEmpty(): boolean;
  isInvalid(): boolean;
}
