import { FieldImpl } from "../fields/field-impl";
import { typeNameFieldSpec, enumValuesFieldSpec } from "../fields/field-spec";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { GlobalFrame } from "../frame-interfaces/global-frame";
import { FrameType } from "../frame-type";
import { SingleLineFrame } from "../single-line-frame";

export class Enum extends SingleLineFrame implements GlobalFrame {
  frameType: FrameType = FrameType.enum;
  isGlobal = true;
  name: FieldImpl;
  values: FieldImpl;
  file: File;
  constructor(parent: File) {
    super(parent);
    this.file = parent;
    this.name = new FieldImpl(this, typeNameFieldSpec);
    this.name.setPlaceholder("<i>Name</i>");
    this.values = new FieldImpl(this, enumValuesFieldSpec);
    this.canHaveBreakPoint = false;
  }

  protected setClasses() {
    super.setClasses();
    this.pushClass(true, "multiline");
  }

  helpId(): string {
    return "enum";
  }

  getFields(): Field[] {
    return [this.name, this.values];
  }
  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_enum`;
  }

  override outerHtmlTag: string = "el-enum";

  indent(): string {
    return "";
  }
}
