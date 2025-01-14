import { Constructor } from "../class-members/constructor";
import { mustBeImmutableType, mustBeUniqueNameInScope } from "../compile-rules";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { File } from "../interfaces/file";
import { SymbolType } from "../interfaces/symbol-type";
import { constructorKeyword, endKeyword, recordKeyword, thisKeyword } from "../keywords";
import {
  parentHelper_compileChildren,
  parentHelper_renderChildrenAsHtml,
  parentHelper_renderChildrenAsSource,
} from "../parent-helpers";
import { ClassSubType, ClassType } from "../symbols/class-type";
import { DuplicateSymbol } from "../symbols/duplicate-symbol";
import { getGlobalScope, isSymbol } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { UnknownSymbol } from "../symbols/unknown-symbol";
import { Transforms } from "../syntax-nodes/transforms";
import { ClassFrame } from "./class-frame";

export class RecordFrame extends ClassFrame {
  constructor(parent: File) {
    super(parent);
    this.isNotInheritable = true;
    this.isRecord = true;
  }

  ofTypes: SymbolType[] = [];
  genericParamMatches: Map<string, SymbolType> = new Map<string, SymbolType>();

  initialKeywords(): string {
    return recordKeyword;
  }

  get symbolId() {
    return this.name.text;
  }
  symbolType(_transforms?: Transforms) {
    return new ClassType(this.symbolId, ClassSubType.concrete, false, true, [], this);
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

  public getDirectSuperClassesTypeAndName(_transforms: Transforms) {
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

  topKeywords(): string {
    return `${recordKeyword} `;
  }

  bottomKeywords(): string {
    return `${endKeyword} ${recordKeyword}`;
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
}
