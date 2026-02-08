import { Frame } from "./frame";
import { ParseNode } from "./parse-node";

export interface Language {
  languageFullName: string;
  defaultFileExtension: string;
  defaultMimeType: string;

  annotation(frame: Frame): string;

  commentRegex(): RegExp;

  renderSingleLineAsHtml(frame: Frame): string;

  renderTopAsHtml(frame: Frame): string;

  renderBottomAsHtml(frame: Frame): string;

  renderNodeAsHtml(node: ParseNode): string;

  parseText(node: ParseNode, text: string): boolean;

  POWER: string;
  MOD: string;
  EQUAL: string;
  NOT_EQUAL: string;
  AND: string;
  OR: string;
  NOT: string;

  COMMENT_MARKER: string; //e.g. `#`

  INT_NAME: string;
  FLOAT_NAME: string;
  BOOL_NAME: string;
  STRING_NAME: string;
}
