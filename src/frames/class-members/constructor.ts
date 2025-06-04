import { ParamListField } from "../fields/param-list-field";
import { FrameWithStatements } from "../frame-with-statements";
import { CodeSource } from "../interfaces/code-source";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { constructorKeyword } from "../keywords";

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

  getFields(): Field[] {
    return [this.params];
  }

  getIdPrefix(): string {
    return "constructor";
  }

  public renderAsHtml(): string {
    return `<el-constructor class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}>
<el-top>${this.contextMenu()}${this.bpAsHtml()}<el-expand>+</el-expand><el-kw>constructor</el-kw>(${this.params.renderAsHtml()})${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
${this.renderChildrenAsHtml()}
<el-kw>end constructor</el-kw>
</el-constructor>`;
  }

  public renderAsSource(): string {
    return `${this.indent()}constructor(${this.params.renderAsSource()})\r
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
