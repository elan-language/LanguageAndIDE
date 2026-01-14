import { Frame } from "./frame";
import { ParseNode } from "./parse-node";

export interface Language {
  languageFullName: string;
  /* defaultFileExtension: string;
  defaultMimeType: string; */

  annotation(frame: Frame): string;

  commentMarker(): string; //e.g. `#`

  commentRegex(): RegExp;

  renderSingleLineAsHtml(frame: Frame): string;

  renderSingleLineAsExport(frame: Frame): string;

  renderTopAsHtml(frame: Frame): string;

  renderTopAsExport(frame: Frame): string;

  renderBottomAsHtml(frame: Frame): string;

  renderBottomAsExport(frame: Frame): string;

  renderNodeAsHtml(node: ParseNode): string;

  parseText(node: ParseNode, text: string): boolean;
}
