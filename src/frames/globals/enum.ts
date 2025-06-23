import { AbstractFrame } from "../abstract-frame";
import { ElanSymbol } from "../compiler-interfaces/elan-symbol";
import { SymbolType } from "../compiler-interfaces/symbol-type";
import { EnumValuesField } from "../fields/enum-values-field";
import { TypeNameField } from "../fields/type-name-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Collapsible } from "../frame-interfaces/collapsible";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { GlobalFrame } from "../frame-interfaces/global-frame";
import { enumKeyword } from "../keywords";
import { EnumType } from "../symbols/enum-type";
import { EnumValueType } from "../symbols/enum-value-type";
import { SymbolScope } from "../symbols/symbol-scope";

export class Enum extends AbstractFrame implements ElanSymbol, GlobalFrame, Collapsible {
  isCollapsible: boolean = true;
  isGlobal = true;
  name: TypeNameField;
  values: EnumValuesField;
  file: File;
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

  symbolType(): SymbolType {
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
    return `<el-enum class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}><el-top>${this.bpAsHtml()}<el-expand>+</el-expand><el-kw>enum </el-kw>${this.name.renderAsHtml()}</el-top> ${this.values.renderAsHtml()}${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-enum>`;
  }

  //`<el-const class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}><el-top>${this.bpAsHtml()}<el-expand>+</el-expand><el-kw>constant </el-kw>${this.name.renderAsHtml()}</el-top><el-kw> set to </el-kw>${this.value.renderAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-const>`;

  indent(): string {
    return "";
  }
  renderAsSource(): string {
    return `enum ${this.name.renderAsSource()} ${this.values.renderAsSource()}\r
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
}
