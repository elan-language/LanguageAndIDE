import { AbstractFrame } from "../abstract-frame";

import { mustBeUniqueNameInScope } from "../compile-rules";
import { EnumValuesField } from "../fields/enum-values-field";
import { TypeNameField } from "../fields/type-name-field";
import { singleIndent } from "../frame-helpers";
import { CodeSource } from "../interfaces/code-source";
import { Collapsible } from "../interfaces/collapsible";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { File } from "../interfaces/file";
import { GlobalFrame } from "../interfaces/global-frame";
import { Scope } from "../interfaces/scope";
import { SymbolType } from "../interfaces/symbol-type";
import { Transforms } from "../interfaces/transforms";
import { enumKeyword } from "../keywords";
import { EnumType } from "../symbols/enum-type";
import { EnumValueType } from "../symbols/enum-value-type";
import { getGlobalScope, symbolMatches } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";

export class Enum extends AbstractFrame implements ElanSymbol, GlobalFrame, Collapsible {
  isCollapsible: boolean = true;
  isGlobal = true;
  name: TypeNameField;
  values: EnumValuesField;
  file: File;
  hrefForFrameHelp: string = "LangRef.html#enum";

  constructor(parent: File) {
    super(parent);
    this.file = parent;
    this.name = new TypeNameField(this);
    this.name.setPlaceholder("<i>Name</i>");
    this.values = new EnumValuesField(this);
  }

  protected setClasses() {
    super.setClasses();
    this.pushClass(true, "multiline");
  }

  get symbolId() {
    return this.name.text;
  }

  symbolType(_transforms?: Transforms): SymbolType {
    return new EnumType(this.symbolId);
  }
  get symbolScope() {
    return SymbolScope.program;
  }

  initialKeywords(): string {
    return enumKeyword;
  }
  getFields(): Field[] {
    return [this.name, this.values];
  }
  getIdPrefix(): string {
    return "enum";
  }
  renderAsHtml(): string {
    return `<el-enum class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}><el-top>${this.bpAsHtml()}<el-expand>+</el-expand><el-kw>enum </el-kw>${this.name.renderAsHtml()}</el-top> ${this.values.renderAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-enum>`;
  }

  //`<el-const class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}><el-top>${this.bpAsHtml()}<el-expand>+</el-expand><el-kw>constant </el-kw>${this.name.renderAsHtml()}</el-top><el-kw> set to </el-kw>${this.value.renderAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-const>`;

  indent(): string {
    return "";
  }
  renderAsSource(): string {
    return `enum ${this.name.renderAsSource()} ${this.values.renderAsSource()}\r
`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];

    const name = this.name.compile(transforms);
    mustBeUniqueNameInScope(
      name,
      getGlobalScope(this),
      transforms,
      this.compileErrors,
      this.htmlId,
    );

    return `const ${name} = {\r
${singleIndent()}${this.values.compile(transforms)}\r
};\r
`;
  }

  parseFrom(source: CodeSource): void {
    source.remove("enum ");
    this.name.parseFrom(source);
    this.values.parseFrom(source);
  }

  enumValueSymbols() {
    const names = this.values
      .renderAsSource()
      .split(",")
      .map((s) => s.trim());

    return names.map((n) => ({
      symbolId: n,
      symbolType: () => new EnumValueType(this.name.renderAsSource(), n),
      symbolScope: SymbolScope.program,
    }));
  }

  resolveSymbol(id: string, transforms: Transforms, _initialScope: Scope): ElanSymbol {
    for (const n of this.enumValueSymbols()) {
      if (n.symbolId === id) {
        return n;
      }
    }

    return this.getParent().resolveSymbol(id, transforms, this);
  }

  symbolMatches(id: string, all: boolean, _initialScope: Scope): ElanSymbol[] {
    const otherMatches = this.getParent().symbolMatches(id, all, this);
    const symbols = this.enumValueSymbols();
    const matches = symbolMatches(id, all, symbols);
    return matches.concat(otherMatches);
  }
}
