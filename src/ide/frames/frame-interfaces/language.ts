import { Frame } from "./frame";
import { ParseNode } from "./parse-node";

export interface Language {
  annotation(frame: Frame): string;

  commentMarker(): string; //e.g. `#`

  renderSingleLineAsHtml(frame: Frame): string;

  renderTopAsHtml(frame: Frame): string;

  renderBottomAsHtml(frame: Frame): string;

  renderNodeAsHtml(node: ParseNode): string;
}
