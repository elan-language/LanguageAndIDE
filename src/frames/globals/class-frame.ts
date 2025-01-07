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
import { CodeSource } from "../code-source";
import { CompileError } from "../compile-error";
import { InheritsFrom } from "../fields/inheritsFrom";
import { Regexes } from "../fields/regexes";
import { TypeNameField } from "../fields/type-name-field";
import { Class } from "../interfaces/class";
import { Collapsible } from "../interfaces/collapsible";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { File } from "../interfaces/file";
import { Frame } from "../interfaces/frame";
import { Parent } from "../interfaces/parent";
import { Profile } from "../interfaces/profile";
import { StatementFactory } from "../interfaces/statement-factory";
import { SymbolType } from "../interfaces/symbol-type";
import { classKeyword } from "../keywords";
import {
  parentHelper_addChildAfter,
  parentHelper_addChildBefore,
  parentHelper_aggregateCompileErrorsOfChildren,
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
} from "../parent-helpers";
import { CommentStatement } from "../statements/comment-statement";
import { getGlobalScope } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { isAstCollectionNode, isAstIdNode } from "../syntax-nodes/ast-helpers";
import { Transforms } from "../syntax-nodes/transforms";

export abstract class ClassFrame
  extends AbstractFrame
  implements Frame, Parent, Collapsible, Class
{
  isCollapsible: boolean = true;
  isParent: boolean = true;
  isClass: boolean = true;
  isAbstract: boolean = false;
  isConcrete: boolean = false;
  isRecord: boolean = false;
  public name: TypeNameField;
  public isNotInheritable = false;
  public inheritance: InheritsFrom;
  private _children: Array<Frame> = new Array<Frame>();

  constructor(parent: File) {
    super(parent);
    this.name = new TypeNameField(this);
    this.inheritance = new InheritsFrom(this);
    this.getChildren().push(new MemberSelector(this));
  }

  ofTypes: SymbolType[] = [];
  genericParamMatches: Map<string, SymbolType> = new Map<string, SymbolType>();

  getFile(): File {
    return this.getParent() as File;
  }

  initialKeywords(): string {
    return classKeyword;
  }

  get symbolScope() {
    return SymbolScope.program;
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

  protected inheritanceAsObjectCode(): string {
    return ``;
  }

  indent(): string {
    return "";
  }

  properties(): (AbstractProperty | Property)[] {
    return this.getChildren().filter(
      (c) => c instanceof Property || c instanceof AbstractProperty,
    ) as (AbstractProperty | Property)[];
  }

  protected propertiesToInit() {
    const pp = this.properties();
    const ps = pp
      .map((p) => p.initCode())
      .filter((s) => s)
      .join(", ");
    return `[${ps}]`;
  }

  public getSuperClassesTypeAndName(transforms: Transforms) {
    if (this.doesInherit()) {
      const superClasses = this.inheritance.getOrTransformAstNode(transforms);

      if (isAstCollectionNode(superClasses)) {
        const nodes = superClasses.items.filter((i) => isAstIdNode(i));
        const typeAndName: [SymbolType, string][] = nodes
          .map((n) => getGlobalScope(this).resolveSymbol(n.id, transforms, this))
          .map((c) => [c.symbolType(transforms), c.symbolId]);

        return typeAndName;
      }
    }
    return [];
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
    return this.getChildren().filter((m) => "isConstructor" in m)[0] as Constructor;
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
  abstract parseTop(source: CodeSource): boolean;

  abstract parseBottom(source: CodeSource): boolean;

  newChildSelector(): AbstractSelector {
    return new MemberSelector(this);
  }

  aggregateCompileErrors(): CompileError[] {
    const cc = parentHelper_aggregateCompileErrorsOfChildren(this);
    return cc.concat(super.aggregateCompileErrors());
  }

  resetCompileStatusAndErrors(): void {
    this.getChildren().forEach((f) => f.resetCompileStatusAndErrors());
    super.resetCompileStatusAndErrors();
  }

  get symbolId() {
    return this.name.text;
  }

  abstract resolveOwnSymbol(id: string, transforms: Transforms): ElanSymbol;
}
