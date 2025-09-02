import { BreakpointEvent } from "../../../compiler/debugging/breakpoint-event";
import { CompileStatus, ParseStatus } from "../status-enums";
import { Field } from "./field";
import { File } from "./file";
import { Parent } from "./parent";
import { Selectable } from "./selectable";

export interface Frame extends Selectable {
  isFrame: boolean;
  isNew: boolean; //A frame is 'New' until any field has been edited or any child added
  hasBeenAddedTo(): void;

  getFile(): File;
  getParent(): Parent;
  getMap(): Map<string, Selectable>;

  renderAsHtml(): string;
  renderAsSource(): string;

  indent(): string;

  getFields(): Field[];
  worstParseStatusOfFields(): ParseStatus;
  updateParseStatus(): void;

  updateDirectives(): void;

  selectFirstField(): boolean;
  selectFieldAfter(current: Field): void;
  selectFieldBefore(current: Field): void;

  //If none, return this
  getNextFrameInTabOrder(): Frame;
  getPreviousFrameInTabOrder(): Frame;

  isMovable(): boolean;
  canInsertBefore(): boolean;
  canInsertAfter(): boolean;

  fieldUpdated(field: Field): void;

  expandCollapseAll(): void;

  readCompileStatus(): CompileStatus;
  insertSelectorAfterLastField(): void;
  insertPeerSelector(before: boolean): void;
  selectNextFrame(): void;

  initialKeywords(): string;
  setParent(parent: Parent): void;

  deleteIfPermissible(): void;

  updateBreakpoints(event: BreakpointEvent): void;

  pasteError: string;

  helpActive: boolean;

  setGhosted(flag: boolean): void;
  isGhosted(): boolean;
}
