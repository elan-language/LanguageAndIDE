import { enumKeyword } from "../../../compiler/keywords";
import { AbstractFrame } from "../abstract-frame";
import { EnumValuesField } from "../fields/enum-values-field";
import { TypeNameField } from "../fields/type-name-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Collapsible } from "../frame-interfaces/collapsible";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { GlobalFrame } from "../frame-interfaces/global-frame";

export class Enum extends AbstractFrame implements GlobalFrame, Collapsible {
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
    return `<el-enum class="${this.cls()}" id='${this.htmlId}' tabindex="-1" ${this.toolTip()}><el-top>${this.bpAsHtml()}<el-expand>+</el-expand><el-kw>enum </el-kw>${this.name.renderAsHtml()}</el-top> ${this.values.renderAsHtml()}${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-enum>`;
  }

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
}
