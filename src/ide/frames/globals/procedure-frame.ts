import { procedureAnnotation, procedureKeyword } from "../../../compiler/keywords";
import { MethodNameField } from "../fields/method-name-field";
import { ParamListField } from "../fields/param-list-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { Parent } from "../frame-interfaces/parent";
import { FrameWithStatements } from "../frame-with-statements";

export abstract class ProcedureFrame extends FrameWithStatements {
  public name: MethodNameField;
  public params: ParamListField;
  file: File;

  constructor(parent: Parent) {
    super(parent);
    this.file = parent as File;
    this.name = new MethodNameField(this);
    this.params = new ParamListField(this, true);
  }

  isProcedure = true;

  initialKeywords(): string {
    return procedureKeyword;
  }

  getFields(): Field[] {
    return [this.name, this.params];
  }

  getIdPrefix(): string {
    return "proc";
  }

  frameSpecificAnnotation(): string {
    return procedureAnnotation;
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
