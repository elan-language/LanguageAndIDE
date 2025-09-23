import { ParseMode } from "./file";

export interface CodeSource {
  pushBackOntoFrontOfCode(push: string): void;
  removeNewLine(): CodeSource;
  removeIndent(): CodeSource;
  isMatch(code: string): boolean;
  isMatchRegEx(regx: RegExp): boolean;
  remove(code: string): CodeSource;
  removeRegEx(regx: RegExp, optionally: boolean): string;
  hasMoreCode(): boolean;
  getRemainingCode(): string;
  peekNextChar(): string;

  readToEndOfLine(): string;
  readUntil(regx: RegExp): string;
  readMatching(regx: RegExp): string;
  readToNonMatchingCloseBracket(): string;
  mode: ParseMode;
}
