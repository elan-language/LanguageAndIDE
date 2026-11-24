import { FieldImpl } from "../fields/field-impl";
import { methodNameFieldSpec, paramListFieldSpec } from "../fields/field-spec";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { Parent } from "../frame-interfaces/parent";
import { FrameWithStatements } from "../frame-with-statements";

export abstract class ProcedureFrame extends FrameWithStatements {
  public name: FieldImpl;
  public params: FieldImpl;
  file: File;

  constructor(parent: Parent) {
    super(parent);
    this.file = parent as File;
    this.name = new FieldImpl(this, methodNameFieldSpec);
    this.params = new FieldImpl(this, paramListFieldSpec);
  }
  isProcedure = true;

  getFields(): Field[] {
    return [this.name, this.params];
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_proc`;
  }

  override outerHtmlTag: string = "el-proc";
}
