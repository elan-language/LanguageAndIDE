import { ParseStatus } from "../status-enums";
import { CodeSource } from "./code-source";
import { editorEvent } from "./editor-event";

export interface Selectable {
  isSelected(): boolean;
  onClick(withFocus?: boolean, multiSelect?: boolean, selection?: [number, number]): void;
  select(withFocus?: boolean, multiSelect?: boolean, selection?: [number, number]): void;
  deselect(): void;

  isFocused(): boolean;
  focus(): void;
  defocus(): void;

  //returning true indicates that code has changed, and so status should be aggregated from the file down
  processKey(keyEvent: editorEvent): boolean;
  renderAsHtml(): string;
  renderAsElanSource(): string;

  readParseStatus(): ParseStatus;

  parseFrom(source: CodeSource): void;
  getHtmlId(): string;
}
