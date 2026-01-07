import { Frame } from "./frame";
import { ParseNode } from "./parse-node";

export interface Language {
  /*   languageFullName: string;
  defaultFileExtension: string;
  defaultMimeType: string; */

  annotation(frame: Frame): string;

  commentMarker(): string; //e.g. `#`

  renderSingleLineAsHtml(frame: Frame): string;

  renderTopAsHtml(frame: Frame): string;

  renderBottomAsHtml(frame: Frame): string;

  renderNodeAsHtml(node: ParseNode): string;

  grammarForNode(node: ParseNode): string; // Return is in ANTLR format, where CAP words refer to lexer symbols, lowercase to the names of other parse nodes

  lexer(): string; // Return is in ANTLR format, defining all keywords, punctuation symbols as capitals, for use by grammarForNode.
}
