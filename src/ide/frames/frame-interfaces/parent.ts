import { AbstractSelector } from "../abstract-selector";
import { Field } from "./field";
import { File } from "./file";
import { Frame } from "./frame";
import { Language } from "./language";
import { StatementFactory } from "./statement-factory";

export interface Parent {
  //External use
  isParent: boolean;

  minimumNumberOfChildrenExceeded(): boolean;
  getFirstChild(): Frame;
  getLastChild(): Frame;
  expand(): void;
  collapse(): void;

  getChildren(): Frame[];
  getChildAfter(child: Frame): Frame;
  getChildBefore(child: Frame): Frame;
  getChildRange(first: Frame, last: Frame): Frame[];
  removeChild(child: Frame): void;
  addChildBefore(newFrame: Frame, existingChild: Frame): void;
  addChildAfter(newFrame: Frame, existingChild: Frame): void;

  indent(): string;

  getFile(): File;

  getIdPrefix(): string;
  hasParent(): boolean;
  getParent(): Parent;

  getFields(): Field[];

  deleteSelectedChildren(): void;

  copySelectedChildren(): boolean;

  moveSelectedChildrenDownOne(): void;
  moveSelectedChildrenUpOne(): void;
  ghostSelectedChildren(): void;
  unghostSelectedChildren(): void;

  insertOrGotoChildSelector(after: boolean, child: Frame): void;
  newChildSelector(): AbstractSelector;

  getFactory(): StatementFactory;

  isGhostedOrWithinAGhostedFrame(): boolean;
  isWithinAnImportedFrame(): boolean;
  isImported(): boolean;

  displayLanguage(): Language;
  sourceLanguage(): Language;
}
