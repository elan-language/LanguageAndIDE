import { constructorKeyword } from "../../../compiler/keywords";
import { ParamListField } from "../fields/param-list-field";
import { selfType } from "../frame-helpers";
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
<el-top>${this.contextMenu()}${this.bpAsHtml()}<el-expand>+</el-expand>
<el-kw>def </el-kw><el-punc>(</el-punc><el-kw>self</el-kw>: ${selfType(this)},${this.params.renderAsHtml()}<el-punc>):</el-punc> <el-kw>none</el-kw>
${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.annotationAsHtml()}${this.getFrNo()}</el-top>
${this.renderChildrenAsHtml()}

</el-constructor>`;
  }

  public renderAsSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}constructor(${this.params.renderAsSource()})\r
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
