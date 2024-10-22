import { AbstractFrame } from "../abstract-frame";
import { AbstractSelector } from "../abstract-selector";
import { AbstractProperty } from "../class-members/abstract-property";
import { Constructor } from "../class-members/constructor";
import { MemberSelector } from "../class-members/member-selector";
import { Property } from "../class-members/property";
import { CodeSource } from "../code-source";
import { CompileError } from "../compile-error";
import { mustBeUniqueNameInScope } from "../compile-rules";
import { Regexes } from "../fields/regexes";
import { TypeNameField } from "../fields/type-name-field";
import { ClassTypeDef } from "../interfaces/class-type-def";
import { Collapsible } from "../interfaces/collapsible";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { File } from "../interfaces/file";
import { Frame } from "../interfaces/frame";
import { Parent } from "../interfaces/parent";
import { Profile } from "../interfaces/profile";
import { StatementFactory } from "../interfaces/statement-factory";
import { SymbolType } from "../interfaces/symbol-type";
import { constructorKeyword, recordKeyword, thisKeyword } from "../keywords";
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
import { getGlobalScope, isSymbol } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { UnknownSymbol } from "../symbols/unknown-symbol";
import { Transforms } from "../syntax-nodes/transforms";

export class RecordFrame extends AbstractFrame implements Frame, Parent, Collapsible, ClassTypeDef {
  isCollapsible: boolean = true;
  isParent: boolean = true;
  isClass: boolean = true;
  public name: TypeNameField;
  public abstract: boolean = false;
  private _children: Array<Frame> = new Array<Frame>();

  constructor(parent: File) {
    super(parent);
    this.name = new TypeNameField(this);
    this.getChildren().push(new MemberSelector(this));
  }

  ofTypes: SymbolType[] = [];
  genericParamMatches: Map<string, SymbolType> = new Map<string, SymbolType>();

  getFile(): File {
    return this.getParent() as File;
  }

  initialKeywords(): string {
    return recordKeyword;
  }
  get symbolId() {
    return this.name.text;
  }
  symbolType(transforms?: Transforms) {
    return new ClassType(this.symbolId, this.isAbstract(), this.isImmutable(), [], this);
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
    return children > 1;
  }

  isAbstract(): boolean {
    return false;
  }
  isImmutable(): boolean {
    return true;
  }
  doesInherit(): boolean {
    return false;
  }

  getFields(): Field[] {
    return [this.name];
  }

  getIdPrefix(): string {
    return "class";
  }

  public renderAsHtml(): string {
    return `<classDef class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>record </keyword>${this.name.renderAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</top>
${parentHelper_renderChildrenAsHtml(this)}
<keyword>end record</keyword>
</classDef>`;
  }

  indent(): string {
    return "";
  }

  public renderAsSource(): string {
    return `record ${this.name.renderAsSource()}\r
${parentHelper_renderChildrenAsSource(this)}\r
end record\r\n`;
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

    const asString = "";

    return `class ${name} {\r
  static emptyInstance() { return system.emptyClass(${name}, ${this.propertiesToInit()});};\r
${parentHelper_compileChildren(this, transforms)}\r${asString}\r
}\r\n`;
  }

  createProperty(priv: boolean = false): Frame {
    return new Property(this, priv);
  }
  createComment(): Frame {
    return new CommentStatement(this);
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
    source.remove(`record `);
    this.name.parseFrom(source);
    source.removeNewLine();
    return true;
  }

  parseBottom(source: CodeSource): boolean {
    let result = false;
    source.removeIndent();
    const keyword = "end record";
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

    const matches = this.getChildren().filter(
      (f) => !(f instanceof Constructor) && isSymbol(f) && (f.symbolId.startsWith(id) || all),
    ) as ElanSymbol[];

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
