import { Deprecated } from "../../elan-type-interfaces";
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
import {
  mustBeInheritableClassOrInterface,
  mustBeKnownSymbolType,
  mustBeSingleAbstractSuperClass,
  mustBeUniqueNameInScope,
  mustNotBeCircularDependency,
} from "../compile-rules";
import { InheritsFromField } from "../fields/inherits-from-field";
import { Regexes } from "../fields/regexes";
import { TypeNameField } from "../fields/type-name-field";
import { isConstructor, isMember } from "../frame-helpers";
import { Class } from "../interfaces/class";
import { CodeSource } from "../interfaces/code-source";
import { Collapsible } from "../interfaces/collapsible";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { File } from "../interfaces/file";
import { Frame } from "../interfaces/frame";
import { Parent } from "../interfaces/parent";
import { Profile } from "../interfaces/profile";
import { Scope } from "../interfaces/scope";
import { StatementFactory } from "../interfaces/statement-factory";
import { SymbolType } from "../interfaces/symbol-type";
import { Transforms } from "../interfaces/transforms";
import { classKeyword, thisKeyword } from "../keywords";
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
import { BreakpointEvent } from "../status-enums";
import { ClassSubType, ClassType } from "../symbols/class-type";
import { DuplicateSymbol } from "../symbols/duplicate-symbol";
import { NullScope } from "../symbols/null-scope";
import { getGlobalScope, isSymbol, symbolMatches } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { UnknownSymbol } from "../symbols/unknown-symbol";
import { isAstCollectionNode, isAstIdNode, transforms } from "../syntax-nodes/ast-helpers";

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

  ofTypes: SymbolType[] = [];

  deprecated: Deprecated | undefined = undefined;

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

  protected propertiesToInit() {
    const pp = this.properties();
    const ps = pp
      .map((p) => p.initCode())
      .filter((s) => s)
      .join(", ");
    return `[${ps}]`;
  }

  private mapSymbol(c: ElanSymbol, transforms: Transforms): [SymbolType, string] {
    return [c.symbolType(transforms), c.symbolId];
  }

  public getDirectSuperClassesTypeAndName(transforms: Transforms) {
    if (this.doesInherit()) {
      const superClasses = this.inheritance.getOrTransformAstNode(transforms);

      if (isAstCollectionNode(superClasses)) {
        const nodes = superClasses.items.filter((i) => isAstIdNode(i));
        const typeAndName: [SymbolType, string][] = nodes
          .map((n) => getGlobalScope(this).resolveSymbol(n.id, transforms, this))
          .map((c) => this.mapSymbol(c, transforms));

        return typeAndName;
      }
    }
    return [];
  }

  protected seenTwice(name: string, seenNames: string[]) {
    return seenNames.filter((s) => s === name).length > 1;
  }

  protected circularDependency(name: string) {
    // circular dependency detected
    mustNotBeCircularDependency(name, this.compileErrors, this.htmlId);
    // any other compiling is not safe
    return `class ${name} { }\r\n`;
  }

  public lookForCircularDependencies(
    cf: ClassFrame,
    seenNames: string[],
    transforms: Transforms,
  ): [boolean, string] {
    if (cf.doesInherit()) {
      const superClasses = cf.inheritance.getOrTransformAstNode(transforms);

      if (isAstCollectionNode(superClasses)) {
        const nodes = superClasses.items.filter((i) => isAstIdNode(i));
        const symbols = nodes
          .map((n) => getGlobalScope(this).resolveSymbol(n.id, transforms, this))
          .filter((n) => n instanceof ClassFrame);

        for (const s of symbols) {
          if (seenNames.includes(s.symbolId)) {
            return [true, s.symbolId];
          }
          const seenNamesThisPath = seenNames.concat([s.symbolId]);
          const [sd, name] = this.lookForCircularDependencies(s, seenNamesThisPath, transforms);
          if (sd) {
            return [sd, name];
          }
        }
      }
    }
    return [false, ""];
  }

  public getAllClasses(
    cf: ClassFrame,
    seenNames: string[],
    filter: (d: ClassFrame) => boolean,
    transforms: Transforms,
  ) {
    if (cf.doesInherit()) {
      const superClasses = cf.inheritance.getOrTransformAstNode(transforms);

      if (isAstCollectionNode(superClasses)) {
        const nodes = superClasses.items.filter((i) => isAstIdNode(i));
        const symbols = nodes
          .map((n) => getGlobalScope(this).resolveSymbol(n.id, transforms, this))
          .filter(
            (n) => n instanceof ClassFrame && !this.seenTwice(n.symbolId, seenNames),
          ) as ClassFrame[];
        let allSymbols = symbols;
        seenNames.push(cf.symbolId);

        for (const s of symbols) {
          allSymbols = allSymbols.concat(this.getAllClasses(s, seenNames, filter, transforms));
        }

        return allSymbols.filter(filter);
      }
    }
    return [];
  }

  public getAllInterfaces(cf: ClassFrame, seenNames: string[], transforms: Transforms) {
    return this.getAllClasses(cf, seenNames, (s: ClassFrame) => s.isInterface, transforms);
  }

  public getAllAbstractClasses(cf: ClassFrame, seenNames: string[], transforms: Transforms) {
    return this.getAllClasses(
      cf,
      seenNames,
      (s: ClassFrame) => s.isAbstract && !s.isInterface,
      transforms,
    );
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

  resetCompileStatusAndErrors(): void {
    this.getChildren().forEach((f) => f.resetCompileStatusAndErrors());
    super.resetCompileStatusAndErrors();
  }

  get symbolId() {
    return this.name.text;
  }

  symbolMatches(id: string, all: boolean, _initialScope: Scope): ElanSymbol[] {
    const otherMatches = this.getParent().symbolMatches(id, all, this);

    const symbols = this.getChildren().filter((f) => isSymbol(f)) as ElanSymbol[];

    const types = this.getDirectSuperClassesTypeAndName(transforms())
      .map((tn) => tn[0])
      .filter((t) => t instanceof ClassType);

    let inheritedMatches: ElanSymbol[] = [];

    for (const ct of types) {
      const s = ct.scope.symbolMatches(id, all, NullScope.Instance);
      inheritedMatches = inheritedMatches.concat(s);
    }

    const matches = symbolMatches(id, all, symbols);

    return matches.concat(inheritedMatches).concat(otherMatches);
  }

  resolveSymbol(id: string, transforms: Transforms, _initialScope: Scope): ElanSymbol {
    const symbol = this.resolveOwnSymbol(id, transforms);

    if (symbol instanceof UnknownSymbol) {
      return this.getParent().resolveSymbol(id, transforms, this);
    }

    return symbol;
  }

  resolveOwnSymbol(id: string, transforms: Transforms): ElanSymbol {
    if (id === thisKeyword) {
      return this;
    }

    let matches = this.getChildren().filter(
      (f) => isSymbol(f) && f.symbolId === id,
    ) as ElanSymbol[];

    const types = this.getDirectSuperClassesTypeAndName(transforms)
      .map((tn) => tn[0])
      .filter((t) => t instanceof ClassType);

    for (const ct of types) {
      const s = ct.scope!.resolveOwnSymbol(id, transforms);
      if (isMember(s)) {
        matches.push(s);
      }
    }

    // we might have picked up the same symbol through diamond inheritance - so filter identical symbols

    matches = Array.from(new Set<ElanSymbol>(matches));

    if (matches.length === 2) {
      // one of the matches must be abstract
      const concreteMatches = matches.filter((i) => isMember(i) && !i.isAbstract);
      if (concreteMatches.length === 1) {
        matches = concreteMatches;
      }
    }

    if (matches.length === 1) {
      return matches[0];
    }

    if (matches.length > 1) {
      return new DuplicateSymbol(matches);
    }

    return new UnknownSymbol(id);
  }

  getName(transforms: Transforms) {
    const name = this.name.text;
    mustBeUniqueNameInScope(
      name,
      getGlobalScope(this),
      transforms,
      this.compileErrors,
      this.htmlId,
    );
    return name;
  }

  getExtends(transforms: Transforms) {
    const typeAndName = this.getDirectSuperClassesTypeAndName(transforms);
    let implement = "";

    for (const [st, name] of typeAndName) {
      mustBeKnownSymbolType(st, name, this.compileErrors, this.htmlId);
      mustBeInheritableClassOrInterface(st, name, this.compileErrors, this.htmlId);

      if (st instanceof ClassType && st.subType === ClassSubType.abstract) {
        implement = `extends ${name} `;
      }
    }

    mustBeSingleAbstractSuperClass(typeAndName, this.compileErrors, this.htmlId);

    return implement;
  }

  getClassIndex() {
    return this.getParent().getChildren().indexOf(this);
  }

  updateBreakpoints(event: BreakpointEvent): void {
    super.updateBreakpoints(event);
    parentHelper_updateBreakpoints(this, event);
  }
}
