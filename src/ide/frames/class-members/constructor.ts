import { constructorKeyword } from "../../../compiler/elan-keywords";
import { ParamListField } from "../fields/param-list-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { FrameWithStatements } from "../frame-with-statements";

export class Constructor extends FrameWithStatements {
  isConstructor = true;
  isMember = true;
  isAbstract = false;
  private = false;
  public params: ParamListField;
  constructor(parent: Parent) {
    super(parent);
    this.params = new ParamListField(this);
  }

  initialKeywords(): string {
    return constructorKeyword;
  }

  getFieldsDefaultImpl(): Field[] {
    return [this.params];
  }

  getIdPrefix(): string {
    return "constructor";
  }

  frameSpecificAnnotation(): string {
    return "constructor";
  }

  override outerHtmlTag: string = "el-constructor";

  public renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}constructor(${this.params.renderAsElanSource()})\r
${this.renderChildrenAsElanSource()}\r
${this.indent()}end constructor\r
`;
  }

  parseTop(source: CodeSource): void {
    source.removeIndent();
    source.remove("constructor(");
    this.params.parseFrom(source);
    source.remove(")");
  }
  parseBottom(source: CodeSource): boolean {
    return this.parseStandardEnding(source, "end constructor");
  }
}
