import { procedureKeyword } from "../../../compiler/elan-keywords";
import { AbstractField, FieldType } from "../fields/abstract-field";
import { MethodNameField } from "../fields/method-name-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { Parent } from "../frame-interfaces/parent";
import { FrameWithStatements } from "../frame-with-statements";

export abstract class ProcedureFrame extends FrameWithStatements {
  public name: MethodNameField;
  public params: AbstractField;
  file: File;

  constructor(parent: Parent) {
    super(parent);
    this.file = parent as File;
    this.name = new MethodNameField(this);
    this.params = new AbstractField(this, FieldType.paramsList);
  }
  isProcedure = true;

  initialKeywords(): string {
    return procedureKeyword;
  }

  getFields(): Field[] {
    return [this.name, this.params];
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_proc`;
  }

  frameSpecificAnnotation(): string {
    return "procedure";
  }

  override outerHtmlTag: string = "el-proc";

  parseTop(source: CodeSource): void {
    source.remove("procedure ");
    this.name.parseFrom(source);
    source.remove("(");
    this.params.parseFrom(source);
    source.remove(")");
  }

  parseBottom(source: CodeSource): boolean {
    return this.parseStandardEnding(source, "end procedure");
  }
}
