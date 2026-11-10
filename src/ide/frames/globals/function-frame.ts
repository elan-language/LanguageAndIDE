import { FieldImpl } from "../fields/field-impl";
import { methodNameFieldSpec, paramListFieldSpec, typeFieldSpec } from "../fields/field-spec";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { Parent } from "../frame-interfaces/parent";
import { FrameWithStatements } from "../frame-with-statements";
import { Paradigm } from "../paradigm";
import { ReturnStatement } from "../statements/return-statement";

export abstract class FunctionFrame extends FrameWithStatements implements Parent {
  public name: FieldImpl;
  public params: FieldImpl;
  public returnType: FieldImpl;
  isFunction = true;
  abstract file: File;

  constructor(parent: Parent) {
    super(parent);
    this.name = new FieldImpl(this, methodNameFieldSpec);
    this.params = new FieldImpl(this, paramListFieldSpec);
    this.returnType = new FieldImpl(this, typeFieldSpec);
    this.getChildren().push(new ReturnStatement(this));
  }

  getParadigm(): Paradigm {
    return this.getFile().getParadigm();
  }

  minimumNumberOfChildrenExceeded(): boolean {
    return this.getChildren().length > 1; // return may be the only statement
  }

  getFields(): Field[] {
    return this.file.language().getFields(this);
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_func`;
  }

  override outerHtmlTag: string = "el-func";
}
