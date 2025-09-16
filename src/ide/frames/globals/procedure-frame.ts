import { procedureKeyword } from "../../../compiler/keywords";
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

  public renderAsHtml(): string {
    return `<el-proc class="${this.cls()}" id='${this.htmlId}' tabindex="-1" ${this.toolTip()}>
<el-top>${this.contextMenu()}${this.bpAsHtml()}<el-expand>+</el-expand><el-kw>procedure </el-kw>${this.name.renderAsHtml()}<el-punc>(</el-punc>${this.params.renderAsHtml()}<el-punc>)</el-punc>${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
${this.renderChildrenAsHtml()}
<el-kw>end procedure</el-kw>
</el-proc>`;
  }

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
