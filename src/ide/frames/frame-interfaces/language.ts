import { Frame } from "./frame";

export interface Language {
  commentMarker(): string; //e.g. `#`

  renderAsHtml(frame: Frame): string;

  annotation(frame: Frame): string;
}
