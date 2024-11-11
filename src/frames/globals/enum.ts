import { AbstractFrame } from "../abstract-frame";
import { CodeSource } from "../code-source";
import { mustBeUniqueNameInScope } from "../compile-rules";
import { EnumValues } from "../fields/enum-values";
import { TypeNameField } from "../fields/type-name-field";
import { singleIndent } from "../helpers";
import { Collapsible } from "../interfaces/collapsible";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { File } from "../interfaces/file";
import { Frame } from "../interfaces/frame";
import { GlobalFrame } from "../interfaces/global-frame";
import { SymbolType } from "../interfaces/symbol-type";
import { enumKeyword } from "../keywords";
import { EnumType } from "../symbols/enum-type";
import { EnumValueType } from "../symbols/enum-value-type";
import { getGlobalScope } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { Transforms } from "../syntax-nodes/transforms";

export class Enum extends AbstractFrame implements ElanSymbol, GlobalFrame, Collapsible {
  isCollapsible: boolean = true;
  isGlobal = true;
  name: TypeNameField;
  values: EnumValues;
  file: File;

  constructor(parent: File) {
    super(parent);
    this.file = parent;
    this.name = new TypeNameField(this);
    this.name.setPlaceholder("Name");
    this.values = new EnumValues(this);
  }

  protected setClasses() {
    super.setClasses();
    this.pushClass(true, "multiline");
  }

  get symbolId() {
    return this.name.text;
  }

  symbolType(transforms?: Transforms): SymbolType {
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
    return `<el-enum class="${this.cls()}" id='${this.htmlId}' tabindex="0"><el-top><el-expand>+</el-expand><el-kw>enum </el-kw>${this.name.renderAsHtml()}</el-top> ${this.values.renderAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</enum>`;
  }

  //`<el-const class="${this.cls()}" id='${this.htmlId}' tabindex="0"><el-top><el-expand>+</el-expand><el-kw>constant </el-kw>${this.name.renderAsHtml()}</el-top><el-kw> set to </el-kw>${this.value.renderAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-const>`;

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

    return `var ${name} = {\r
${singleIndent()}${this.values.compile(transforms)}\r
};\r
`;
  }

  parseFrom(source: CodeSource): void {
    source.remove("enum ");
    this.name.parseFrom(source);
    this.values.parseFrom(source);
  }

  resolveSymbol(id: string, transforms: Transforms, initialScope: Frame): ElanSymbol {
    const names = this.values
      .renderAsSource()
      .split(",")
      .map((s) => s.trim());

    for (const n of names) {
      if (n === id) {
        return {
          symbolId: id,
          symbolType: () => new EnumValueType(this.name.renderAsSource(), id),
          symbolScope: SymbolScope.program,
        };
      }
    }

    return this.getParent().resolveSymbol(id, transforms, this);
  }
}
