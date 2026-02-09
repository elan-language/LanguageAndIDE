import {
  endKeyword,
  functionKeyword,
  returnKeyword,
  returnsKeyword,
} from "../../../compiler/keywords";
import { MethodNameField } from "../fields/method-name-field";
import { ParamListField } from "../fields/param-list-field";
import { TypeField } from "../fields/type-field";
import { isReturnStatement } from "../frame-helpers";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { Parent } from "../frame-interfaces/parent";
import { Profile } from "../frame-interfaces/profile";
import { FrameWithStatements } from "../frame-with-statements";
import { ReturnStatement } from "../statements/return-statement";

export abstract class FunctionFrame extends FrameWithStatements implements Parent {
  public name: MethodNameField;
  public params: ParamListField;
  public returnType: TypeField;
  file: File;
  isFunction = true;

  constructor(parent: Parent) {
    super(parent);
    this.file = parent as File;
    this.name = new MethodNameField(this);
    this.params = new ParamListField(this);
    this.returnType = new TypeField(this);
    this.getChildren().push(new ReturnStatement(this));
  }
  initialKeywords(): string {
    return functionKeyword;
  }

  getProfile(): Profile {
    return this.getFile().getProfile();
  }

  minimumNumberOfChildrenExceeded(): boolean {
    return this.getChildren().length > 1; // return may be the only statement
  }

  getFieldsDefaultImpl(): Field[] {
    return [this.name, this.params, this.returnType];
  }

  getIdPrefix(): string {
    return "func";
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
    const keyword = `${returnKeyword} `;
    source.removeIndent();
    if (source.isMatch(keyword)) {
      this.getReturnStatement().parseFrom(source);
      source.removeNewLine().removeIndent();
      this.parseStandardEnding(source, `${endKeyword} ${functionKeyword}`);
      result = true;
    }
    return result;
  }
  protected getReturnStatement(): ReturnStatement {
    return this.getChildren().filter((s) => isReturnStatement(s))[0];
  }
}
