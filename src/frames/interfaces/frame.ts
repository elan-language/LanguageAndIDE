import { CompileError } from "../compile-error";
import { BreakpointEvent, CompileStatus, ParseStatus } from "../status-enums";
import { ElanSymbol } from "./elan-symbol";
import { Field } from "./field";
import { File } from "./file";
import { Parent } from "./parent";
import { Scope } from "./scope";
import { Selectable } from "./selectable";
import { Transforms } from "./transforms";

export interface Frame extends Selectable, Scope, ElanSymbol {
  isFrame: boolean;
  isNew: boolean; //A frame is 'New' until any field has been edited or any child added
  hasBeenAddedTo(): void;

  getFile(): File;
  getParent(): Parent;
  getMap(): Map<string, Selectable>;

  renderAsHtml(): string;
  renderAsSource(): string;
  compile(transforms: Transforms): string;

  indent(): string;

  getFields(): Field[];
  worstParseStatusOfFields(): ParseStatus;
  updateParseStatus(): void;

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

  compileErrors: CompileError[];
  readCompileStatus(): CompileStatus;
  updateCompileStatus(): void;
  resetCompileStatusAndErrors(): void;
  insertSelectorAfterLastField(): void;
  insertPeerSelector(before: boolean): void;
  selectNextFrame(): void;

  initialKeywords(): string;
  setParent(parent: Parent): void;

  deleteIfPermissible(): void;

  updateBreakpoints(event: BreakpointEvent): void;

  setCompileScope(s: Scope): void;

  pasteError: string;
}
