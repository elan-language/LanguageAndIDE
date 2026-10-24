import { procedureKeyword } from "../../../compiler/elan-keywords";
import { CompoundFrame } from "../compound-statement";
import { FieldImpl } from "../fields/field-impl";
import { methodNameFieldSpec, paramListFieldSpec } from "../fields/field-spec";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { Parent } from "../frame-interfaces/parent";

export abstract class ProcedureFrame extends CompoundFrame {
  public name: FieldImpl;
  public params: FieldImpl;
  file: File;

  constructor(parent: Parent) {
    super(parent);
    this.file = parent.getFile();
    this.name = new FieldImpl(this, methodNameFieldSpec);
    this.params = new FieldImpl(this, paramListFieldSpec);
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
