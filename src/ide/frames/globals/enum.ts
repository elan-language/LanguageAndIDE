import { enumKeyword } from "../../../compiler/keywords";
import { EnumValuesField } from "../fields/enum-values-field";
import { TypeNameField } from "../fields/type-name-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { GlobalFrame } from "../frame-interfaces/global-frame";
import { SingleLineFrame } from "../single-line-frame";

export class Enum extends SingleLineFrame implements GlobalFrame {
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
  getFieldsDefaultImpl(): Field[] {
    return [this.name, this.values];
  }
  getIdPrefix(): string {
    return "enum";
  }

  frameSpecificAnnotation(): string {
    return "enum";
  }

  override outerHtmlTag: string = "el-enum";

  indent(): string {
    return "";
  }
  renderAsElanSource(): string {
    return `${this.sourceAnnotations()}enum ${this.name.renderAsElanSource()} ${this.values.renderAsElanSource()}\r
`;
  }

  parseFrom(source: CodeSource): void {
    source.remove("enum ");
    this.name.parseFrom(source);
    this.values.parseFrom(source);
  }
}
