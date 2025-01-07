import { Constructor } from "../class-members/constructor";
import { CodeSource } from "../code-source";
import { mustBeImmutableType, mustBeUniqueNameInScope } from "../compile-rules";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { Frame } from "../interfaces/frame";
import { SymbolType } from "../interfaces/symbol-type";
import { constructorKeyword, recordKeyword, thisKeyword } from "../keywords";
import {
  parentHelper_compileChildren,
  parentHelper_renderChildrenAsHtml,
  parentHelper_renderChildrenAsSource,
} from "../parent-helpers";
import { ClassType } from "../symbols/class-type";
import { DuplicateSymbol } from "../symbols/duplicate-symbol";
import { getGlobalScope, isSymbol, symbolMatches } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { UnknownSymbol } from "../symbols/unknown-symbol";
import { Transforms } from "../syntax-nodes/transforms";
import { ClassFrame } from "./class-frame";

export class RecordFrame extends ClassFrame {
  isInheritable: boolean = false;

  public abstract: boolean = false;

  ofTypes: SymbolType[] = [];
  genericParamMatches: Map<string, SymbolType> = new Map<string, SymbolType>();

  initialKeywords(): string {
    return recordKeyword;
  }

  override isRecord(): boolean {
    return true;
  }
  get symbolId() {
    return this.name.text;
  }
  symbolType(_transforms?: Transforms) {
    return new ClassType(this.symbolId, false, false, true, [], this);
  }
  get symbolScope() {
    return SymbolScope.program;
  }

  getFields(): Field[] {
    return [this.name];
  }

  getIdPrefix(): string {
    return "class";
  }

  public renderAsHtml(): string {
    return `<el-class class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<el-top><el-expand>+</el-expand><el-kw>record </el-kw>${this.name.renderAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
${parentHelper_renderChildrenAsHtml(this)}
<el-kw>end record</el-kw>
</el-class>`;
  }

  public renderAsSource(): string {
    return `record ${this.name.renderAsSource()}\r
${parentHelper_renderChildrenAsSource(this)}\r
end record\r\n`;
  }

  public getSuperClassesTypeAndName(_transforms: Transforms) {
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
    const body = parentHelper_compileChildren(this, transforms);

    for (const p of this.properties()) {
      mustBeImmutableType(p.name.text, p.symbolType(), this.compileErrors, this.htmlId);
    }

    return `class ${name} {\r
  static emptyInstance() { return system.emptyClass(${name}, ${this.propertiesToInit()});};\r
${body}\r${asString}\r
}\r\n`;
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

  resolveOwnSymbol(id: string, _transforms: Transforms): ElanSymbol {
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

  resolveSymbol(id: string, transforms: Transforms, _initialScope: Frame): ElanSymbol {
    const symbol = this.resolveOwnSymbol(id, transforms);

    if (symbol instanceof UnknownSymbol) {
      return this.getParent().resolveSymbol(id, transforms, this);
    }

    return symbol;
  }

  symbolMatches(id: string, all: boolean, _initialScope?: Frame | undefined): ElanSymbol[] {
    const otherMatches = this.getParent().symbolMatches(id, all, this);

    const symbols = this.getChildren().filter(
      (f) => !(f instanceof Constructor) && isSymbol(f),
    ) as ElanSymbol[];

    const matches = symbolMatches(id, all, symbols);

    return matches.concat(otherMatches);
  }
}
