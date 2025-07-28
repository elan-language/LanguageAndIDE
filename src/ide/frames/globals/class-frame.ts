import { SymbolType } from "../../../compiler/compiler-interfaces/symbol-type";
import { BreakpointEvent } from "../../../compiler/debugging/breakpoint-event";
import { classKeyword } from "../../../compiler/keywords";
import { ClassSubType } from "../../../compiler/symbols/class-type";
import { AbstractFrame } from "../abstract-frame";
import { AbstractSelector } from "../abstract-selector";
import { AbstractFunction } from "../class-members/abstract-function";
import { AbstractProcedure } from "../class-members/abstract-procedure";
import { AbstractProperty } from "../class-members/abstract-property";
import { Constructor } from "../class-members/constructor";
import { FunctionMethod } from "../class-members/function-method";
import { MemberSelector } from "../class-members/member-selector";
import { ProcedureMethod } from "../class-members/procedure-method";
import { Property } from "../class-members/property";
import { InheritsFromField } from "../fields/inherits-from-field";
import { Regexes } from "../fields/regexes";
import { TypeNameField } from "../fields/type-name-field";
import { isConstructor } from "../frame-helpers";
import { CodeSource } from "../frame-interfaces/code-source";
import { Collapsible } from "../frame-interfaces/collapsible";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { Frame } from "../frame-interfaces/frame";
import { Parent } from "../frame-interfaces/parent";
import { Profile } from "../frame-interfaces/profile";
import { StatementFactory } from "../frame-interfaces/statement-factory";
import {
  parentHelper_addChildAfter,
  parentHelper_addChildBefore,
  parentHelper_deleteSelectedChildren,
  parentHelper_getChildAfter,
  parentHelper_getChildBefore,
  parentHelper_getChildRange,
  parentHelper_getFirstChild,
  parentHelper_getFirstSelectorAsDirectChild,
  parentHelper_getLastChild,
  parentHelper_insertOrGotoChildSelector,
  parentHelper_moveSelectedChildrenDownOne,
  parentHelper_moveSelectedChildrenUpOne,
  parentHelper_readWorstCompileStatusOfChildren,
  parentHelper_readWorstParseStatusOfChildren,
  parentHelper_removeChild,
  parentHelper_updateBreakpoints,
} from "../parent-helpers";
import { CommentStatement } from "../statements/comment-statement";

export abstract class ClassFrame extends AbstractFrame implements Frame, Parent, Collapsible {
  isCollapsible: boolean = true;
  isParent: boolean = true;
  isClass: boolean = true;
  isAbstract: boolean = false;
  isConcrete: boolean = false;
  isRecord: boolean = false;
  isInterface: boolean = false;
  public name: TypeNameField;
  public isNotInheritable = false;
  public inheritance: InheritsFromField;
  private _children: Array<Frame> = new Array<Frame>();
  constructor(parent: File) {
    super(parent);
    this.name = new TypeNameField(this);
    this.inheritance = new InheritsFromField(this);
    this.getChildren().push(new MemberSelector(this));
  }

  updateOfTypes(_ofTypes: SymbolType[]) {
    return this;
  }

  get subType(): ClassSubType {
    if (this.isInterface) {
      return ClassSubType.interface;
    }
    if (this.isAbstract) {
      return ClassSubType.abstract;
    }
    return ClassSubType.concrete;
  }

  getFile(): File {
    return this.getParent() as File;
  }

  initialKeywords(): string {
    return classKeyword;
  }

  getProfile(): Profile {
    return this.getFile().getProfile();
  }
  protected setClasses() {
    super.setClasses();
    this.pushClass(true, "multiline");
  }

  updateParseStatus(): void {
    this.getChildren().forEach((c) => c.updateParseStatus());
    const worstOfFieldOrChildParseStatus = Math.min(
      this.worstParseStatusOfFields(),
      parentHelper_readWorstParseStatusOfChildren(this),
    );
    this.setParseStatus(worstOfFieldOrChildParseStatus);
  }

  updateCompileStatus(): void {
    this.getChildren().forEach((c) => c.updateCompileStatus());
    const worstOfChildren = parentHelper_readWorstCompileStatusOfChildren(this);
    super.updateCompileStatus(); //will update it based on fields and its own direct compile errors
    const newStatus = Math.min(this.readCompileStatus(), worstOfChildren);
    this.setCompileStatus(newStatus);
  }

  getFactory(): StatementFactory {
    return this.getParent().getFactory();
  }

  getChildren(): Frame[] {
    return this._children;
  }

  getFirstChild(): Frame {
    return parentHelper_getFirstChild(this);
  }
  getLastChild(): Frame {
    return parentHelper_getLastChild(this);
  }
  getChildAfter(child: Frame): Frame {
    return parentHelper_getChildAfter(this, child);
  }
  getChildBefore(child: Frame): Frame {
    return parentHelper_getChildBefore(this, child);
  }
  getChildRange(first: Frame, last: Frame): Frame[] {
    return parentHelper_getChildRange(this, first, last);
  }
  getFirstSelectorAsDirectChild(): AbstractSelector {
    return parentHelper_getFirstSelectorAsDirectChild(this);
  }
  addChildBefore(child: Frame, before: Frame): void {
    parentHelper_addChildBefore(this, child, before);
  }
  addChildAfter(child: Frame, before: Frame): void {
    parentHelper_addChildAfter(this, child, before);
  }
  removeChild(child: Frame): void {
    parentHelper_removeChild(this, child);
  }
  insertOrGotoChildSelector(after: boolean, child: Frame) {
    parentHelper_insertOrGotoChildSelector(this, after, child);
  }
  deleteSelectedChildren(): void {
    parentHelper_deleteSelectedChildren(this);
  }
  moveSelectedChildrenUpOne(): void {
    parentHelper_moveSelectedChildrenUpOne(this);
  }
  moveSelectedChildrenDownOne(): void {
    parentHelper_moveSelectedChildrenDownOne(this);
  }

  fieldUpdated(_field: Field): void {}

  minimumNumberOfChildrenExceeded(): boolean {
    return this.getChildren().length > 1;
  }

  selectNextFrame(): void {
    this._children[0]?.select(true, false);
  }

  doesInherit(): boolean {
    return this.inheritance.text !== "";
  }

  getFields(): Field[] {
    return [this.name, this.inheritance];
  }

  getIdPrefix(): string {
    return "class";
  }

  protected inheritanceAsHtml(): string {
    return ` ${this.inheritance.renderAsHtml()}`;
  }
  protected inheritanceAsSource(): string {
    return this.doesInherit() ? ` ${this.inheritance.renderAsSource()}` : ``;
  }

  indent(): string {
    return "";
  }

  properties(): (AbstractProperty | Property)[] {
    return this.getChildren().filter(
      (c) => c instanceof Property || c instanceof AbstractProperty,
    ) as (AbstractProperty | Property)[];
  }

  protected seenTwice(name: string, seenNames: string[]) {
    return seenNames.filter((s) => s === name).length > 1;
  }

  createConstructor(): Frame {
    return new Constructor(this);
  }

  createFunction(priv: boolean = false): Frame {
    return new FunctionMethod(this, priv);
  }
  createProperty(priv: boolean = false): Frame {
    return new Property(this, priv);
  }
  createProcedure(priv: boolean = false): Frame {
    return new ProcedureMethod(this, priv);
  }
  createAbstractFunction(): Frame {
    return new AbstractFunction(this);
  }
  createAbstractProperty(): Frame {
    return new AbstractProperty(this);
  }
  createAbstractProcedure(): Frame {
    return new AbstractProcedure(this);
  }
  createComment(): Frame {
    return new CommentStatement(this);
  }

  public getConstructor(): Constructor {
    return this.getChildren().filter((m) => isConstructor(m))[0] as Constructor;
  }
  parseFrom(source: CodeSource): void {
    this.parseTop(source);
    while (!this.parseBottom(source)) {
      if (source.isMatchRegEx(Regexes.newLine)) {
        source.removeRegEx(Regexes.newLine, false);
        source.removeIndent();
      } else {
        this.getFirstSelectorAsDirectChild().parseFrom(source);
      }
    }
  }
  abstract topKeywords(): string;

  parseTop(source: CodeSource): boolean {
    source.remove(this.topKeywords());
    this.name.parseFrom(source);
    this.inheritance.parseFrom(source);
    return true;
  }

  abstract bottomKeywords(): string;

  parseBottom(source: CodeSource): boolean {
    let result = false;
    source.removeIndent();
    if (source.isMatch(this.bottomKeywords())) {
      source.remove(this.bottomKeywords());
      result = true;
    }
    return result;
  }

  newChildSelector(): AbstractSelector {
    return new MemberSelector(this);
  }

  getClassIndex() {
    return this.getParent().getChildren().indexOf(this);
  }

  updateBreakpoints(event: BreakpointEvent): void {
    super.updateBreakpoints(event);
    parentHelper_updateBreakpoints(this, event);
  }
}
