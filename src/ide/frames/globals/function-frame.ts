import {
  endKeyword,
  functionKeyword,
  returnKeyword,
  returnsKeyword,
} from "../../../compiler/elan-keywords";
import { CompoundFrame } from "../compound-frame";
import { FieldImpl } from "../fields/field-impl";
import { methodNameFieldSpec, paramListFieldSpec, typeFieldSpec } from "../fields/field-spec";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { Parent } from "../frame-interfaces/parent";
import { Paradigm } from "../paradigm";
import { ReturnStatement } from "../statements/return-statement";

export abstract class FunctionFrame extends CompoundFrame implements Parent {
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
  initialKeywords(): string {
    return functionKeyword;
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

  frameSpecificAnnotation(): string {
    return "function";
  }

  override outerHtmlTag: string = "el-func";

  parseTop(source: CodeSource): void {
    source.remove(`${functionKeyword} `);
    this.name.parseFrom(source);
    source.remove("(");
    this.params.parseFrom(source);
    source.remove(`) ${returnsKeyword} `);
    this.returnType.parseFrom(source);
  }
  parseBottom(source: CodeSource): boolean {
    let result = false;
    source.removeIndent();
    if (source.isMatch(`${returnKeyword} `)) {
      const ret = this.getLastChild() as ReturnStatement;
      ret.parseFrom(source);
      source.removeNewLine().removeIndent();
      this.parseStandardEnding(source, `${endKeyword} ${functionKeyword}`);
      result = true;
    }
    return result;
  }
}
