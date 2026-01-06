import { constructorKeyword } from "../../../compiler/keywords";
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
    this.params = new ParamListField(this, false);
  }

  initialKeywords(): string {
    return constructorKeyword;
  }

  getFields(): Field[] {
    return [this.params];
  }

  getIdPrefix(): string {
    return "constructor";
  }

  public renderAsHtml(): string {
    return `<el-constructor class="${this.cls()}" id='${this.htmlId}' tabindex="-1" ${this.toolTip()}>
<el-top>${this.contextMenu()}${this.bpAsHtml()}<el-expand>+</el-expand>${this.language().renderTopAsHtml(this)}${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.annotationAsHtml()}${this.getFrNo()}</el-top>
${this.renderChildrenAsHtml()}

</el-constructor>`;
  }

  public renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}constructor(${this.params.renderAsElanSource()})\r
${this.renderChildrenAsSource()}\r
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
