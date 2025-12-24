import { enumKeyword } from "../../../compiler/keywords";
import { AbstractFrame } from "../abstract-frame";
import { EnumValuesField } from "../fields/enum-values-field";
import { TypeNameField } from "../fields/type-name-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { GlobalFrame } from "../frame-interfaces/global-frame";

export class Enum extends AbstractFrame implements GlobalFrame {
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
    this.canHaveBreakPoint = false;
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
    return `<el-enum class="${this.cls()}" id='${this.htmlId}' tabindex="-1" ${this.toolTip()}><el-top>${this.contextMenu()}${this.bpAsHtml()}<el-comment>TODO: enum ${this.name.renderAsSource()} ${this.values.renderAsSource()}</el-comment>${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-top></el-enum>`;
  }

  indent(): string {
    return "";
  }
  renderAsSource(): string {
    return `${this.sourceAnnotations()}enum ${this.name.renderAsSource()} ${this.values.renderAsSource()}\r
`;
  }

  parseFrom(source: CodeSource): void {
    source.remove("enum ");
    this.name.parseFrom(source);
    this.values.parseFrom(source);
  }

  override isWithinAnImportedFrame(): boolean {
    return false; // So that frame number is still added
  }
}
