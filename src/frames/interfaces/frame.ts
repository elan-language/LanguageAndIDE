import { CompileError } from "../compile-error";
import { CompileStatus, ParseStatus } from "../status-enums";
import { Transforms } from "../syntax-nodes/transforms";
import { Field } from "./field";
import { File } from "./file";
import { Parent } from "./parent";
import { Scope } from "./scope";
import { Selectable } from "./selectable";
import { ElanSymbol } from "./symbol";

export interface Frame extends Selectable, Scope, ElanSymbol {
  isFrame: boolean;

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
  aggregateCompileErrors(): CompileError[];
  readCompileStatus(): CompileStatus;
  updateCompileStatus(): void;
  resetCompileStatusAndErrors(): void;
  insertSelectorAfterLastField(): void;
  insertPeerSelector(before: boolean): void;

  initialKeywords(): string;
  setParent(parent: Parent): void;
}
