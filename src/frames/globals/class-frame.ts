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
import {
    mustBeAbstractClass,
    mustBeKnownSymbolType,
    mustBeUniqueNameInScope,
    mustImplementSuperClasses,
} from "../compile-rules";
import { InheritsFrom } from "../fields/inheritsFrom";
import { Regexes } from "../fields/regexes";
import { TypeNameField } from "../fields/type-name-field";
import { isMember } from "../helpers";
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
import { abstractKeyword, classKeyword, constructorKeyword, thisKeyword } from "../keywords";
import {
    parentHelper_addChildAfter,
    parentHelper_addChildBefore,
    parentHelper_aggregateCompileErrorsOfChildren,
    parentHelper_compileChildren,
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
    parentHelper_renderChildrenAsHtml,
    parentHelper_renderChildrenAsSource,
} from "../parent-helpers";
import { CommentStatement } from "../statements/comment-statement";
import { ClassType } from "../symbols/class-type";
import { DuplicateSymbol } from "../symbols/duplicate-symbol";
import { getGlobalScope, isSymbol, symbolMatches } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { UnknownSymbol } from "../symbols/unknown-symbol";
import { UnknownType } from "../symbols/unknown-type";
import { isAstCollectionNode, isAstIdNode } from "../syntax-nodes/ast-helpers";
import { Transforms } from "../syntax-nodes/transforms";

export class ClassFrame extends AbstractFrame implements Frame, Parent, Collapsible, Class {
  isCollapsible: boolean = true;
  isParent: boolean = true;
  isClass: boolean = true;
  public name: TypeNameField;
  public abstract: boolean;
  public inheritance: InheritsFrom;
  private _children: Array<Frame> = new Array<Frame>();

  constructor(parent: File, abstract = false) {
    super(parent);
    this.name = new TypeNameField(this);
    this.inheritance = new InheritsFrom(this);
    this.abstract = abstract;
    if (!abstract) {
      this.getChildren().push(new Constructor(this));
    }
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
  get symbolId() {
    return this.name.text;
  }
  symbolType(transforms?: Transforms) {
    return new ClassType(
      this.symbolId,
      this.isAbstract(),
      this.isImmutable(),
      this.inheritance.symbolTypes(transforms),
      this,
    );
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
  moveSelectedChildrenUpOne(): void {
    parentHelper_moveSelectedChildrenUpOne(this);
  }
  moveSelectedChildrenDownOne(): void {
    parentHelper_moveSelectedChildrenDownOne(this);
  }

  fieldUpdated(field: Field): void {}

  minimumNumberOfChildrenExceeded(): boolean {
    const children = this.getChildren().length;
    return this.isAbstract() ? children > 1 : children > 2; // Concrete class must include constructor
  }

  isAbstract(): boolean {
    return this.abstract;
  }
  makeAbstract(): void {
    this.abstract = true;
    this.getChildren().splice(0, 1); //remove constructor
  }
  isImmutable(): boolean {
    return false;
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
  private modifiersAsHtml(): string {
    let result = "";
    result += this.isAbstract() ? `<el-kw>abstract </el-kw>` : ``;
    result += this.isImmutable() ? `<el-kw>immutable </el-kw>` : ``;
    return result;
  }
  private modifiersAsSource(): string {
    let result = "";
    if (this.isAbstract()) {
      result += `abstract `;
    }
    if (this.isImmutable()) {
      result += `immutable `;
    }
    return result;
  }
  private inheritanceAsHtml(): string {
    return ` ${this.inheritance.renderAsHtml()}`;
  }
  private inheritanceAsSource(): string {
    return this.doesInherit() ? ` ${this.inheritance.renderAsSource()}` : ``;
  }

  private inheritanceAsObjectCode(): string {
    return ``;
  }

  public renderAsHtml(): string {
    return `<el-class class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand>${this.modifiersAsHtml()}<el-kw>class </el-kw>${this.name.renderAsHtml()}${this.inheritanceAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</top>
${parentHelper_renderChildrenAsHtml(this)}
<el-kw>end class</el-kw>
</el-class>`;
  }

  indent(): string {
    return "";
  }

  public renderAsSource(): string {
    return `${this.modifiersAsSource()}class ${this.name.renderAsSource()}${this.inheritanceAsSource()}\r
${parentHelper_renderChildrenAsSource(this)}\r
end class\r\n`;
  }

  private propertiesToInit() {
    const pp = this.getChildren().filter(
      (c) => c instanceof Property || c instanceof AbstractProperty,
    ) as (AbstractProperty | Property)[];
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
        const typeAndName: [ClassType | UnknownType, string][] = nodes
          .map((n) => getGlobalScope(this).resolveSymbol(n.id, transforms, this))
          .map((c) => [c.symbolType(transforms) as ClassType | UnknownType, c.symbolId]);

        return typeAndName;
      }
    }
    return [];
  }

  public compile(transforms: Transforms): string {
    this.compileErrors = [];

    const name = this.name.compile(transforms);
    mustBeUniqueNameInScope(
      name,
      getGlobalScope(this),
      transforms,
      this.compileErrors,
      this.htmlId,
    );

    const typeAndName = this.getSuperClassesTypeAndName(transforms);

    for (const st of typeAndName) {
      mustBeKnownSymbolType(st[0], st[1], this.compileErrors, this.htmlId);
    }

    for (const st of typeAndName) {
      mustBeAbstractClass(st[0], this.compileErrors, this.htmlId);
    }

    mustImplementSuperClasses(
      transforms,
      this.symbolType(transforms),
      typeAndName.map((tn) => tn[0]).filter((st) => st instanceof ClassType) as ClassType[],
      this.compileErrors,
      this.htmlId,
    );

    const asString = this.isAbstract()
      ? `
  asString() {
    return "empty Abstract Class ${name}";
  }`
      : "";

    return `class ${name}${this.inheritanceAsObjectCode()} {\r
  static emptyInstance() { return system.emptyClass(${name}, ${this.propertiesToInit()});};\r
${parentHelper_compileChildren(this, transforms)}\r${asString}\r
}\r\n`;
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
  createComment(): Frame {
    return new CommentStatement(this);
  }
  createAbstractProperty(): Frame {
    return new AbstractProperty(this);
  }
  createAbstractProcedure(): Frame {
    return new AbstractProcedure(this);
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
  parseTop(source: CodeSource): boolean {
    const abs = `${abstractKeyword} `;
    if (source.isMatch(abs)) {
      source.remove(abs);
    }
    source.remove(`${classKeyword} `);
    this.name.parseFrom(source);
    this.inheritance.parseFrom(source);
    source.removeNewLine();
    if (!this.isAbstract()) {
      this.getConstructor().parseFrom(source);
    }
    return true;
  }

  parseBottom(source: CodeSource): boolean {
    let result = false;
    source.removeIndent();
    const keyword = "end class";
    if (source.isMatch(keyword)) {
      source.remove(keyword);
      result = true;
    }
    return result;
  }
  newChildSelector(): AbstractSelector {
    return new MemberSelector(this);
  }

  resolveOwnSymbol(id: string, transforms: Transforms): ElanSymbol {
    if (id === thisKeyword) {
      return this;
    }

    if (id === constructorKeyword) {
      return this.getChildren().find((c) => c instanceof Constructor) ?? new UnknownSymbol(id);
    }

    const matches = this.getChildren().filter(
      (f) => isSymbol(f) && f.symbolId === id,
    ) as ElanSymbol[];

    const types = this.getSuperClassesTypeAndName(transforms)
      .map((tn) => tn[0])
      .filter((t) => t instanceof ClassType);

    for (const ct of types) {
      const s = ct.scope!.resolveOwnSymbol(id, transforms);
      if (isMember(s) && s.private) {
        matches.push(s);
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

  resolveSymbol(id: string, transforms: Transforms, initialScope: Frame): ElanSymbol {
    const symbol = this.resolveOwnSymbol(id, transforms);

    if (symbol instanceof UnknownSymbol) {
      return this.getParent().resolveSymbol(id, transforms, this);
    }

    return symbol;
  }

  symbolMatches(id: string, all: boolean, initialScope?: Frame | undefined): ElanSymbol[] {
    const otherMatches = this.getParent().symbolMatches(id, all, this);

    const symbols = this.getChildren().filter(
      (f) => !(f instanceof Constructor) && isSymbol(f),
    ) as ElanSymbol[];

    const matches = symbolMatches(id, all, symbols);

    return matches.concat(otherMatches);
  }

  aggregateCompileErrors(): CompileError[] {
    const cc = parentHelper_aggregateCompileErrorsOfChildren(this);
    return cc.concat(super.aggregateCompileErrors());
  }

  resetCompileStatusAndErrors(): void {
    this.getChildren().forEach((f) => f.resetCompileStatusAndErrors());
    super.resetCompileStatusAndErrors();
  }
}
