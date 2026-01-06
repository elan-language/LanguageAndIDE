import { eachKeyword } from "../../../compiler/keywords";
import { ExpressionField } from "../fields/expression-field";
import { IdentifierField } from "../fields/identifier-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { FrameWithStatements } from "../frame-with-statements";

export class Each extends FrameWithStatements implements Statement {
  isStatement = true;
  variable: IdentifierField;
  iter: ExpressionField;
  constructor(parent: File | Parent) {
    super(parent);
    this.variable = new IdentifierField(this);
    this.variable.setPlaceholder("<i>elementName</i>");
    this.iter = new ExpressionField(this);
    this.iter.setPlaceholder("<i>source</i>");
  }
  initialKeywords(): string {
    return eachKeyword;
  }

  getFields(): Field[] {
    return [this.variable, this.iter];
  }

  getIdPrefix(): string {
    return "each";
  }

  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="-1" ${this.toolTip()}>
<el-top>${this.contextMenu()}${this.bpAsHtml()}<el-expand>+</el-expand>${this.language().renderTopAsHtml(this)}
${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.annotationAsHtml()}${this.getFrNo()}</el-top>
${this.renderChildrenAsHtml()}
${this.language().renderBottomAsHtml(this)}
</el-statement>`;
  }

  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}each ${this.variable.renderAsElanSource()} in ${this.iter.renderAsElanSource()}\r
${this.renderChildrenAsSource()}\r
${this.indent()}end each`;
  }

  parseTop(source: CodeSource): void {
    source.remove("each ");
    this.variable.parseFrom(source);
    source.remove(" in ");
    this.iter.parseFrom(source);
  }
  parseBottom(source: CodeSource): boolean {
    return this.parseStandardEnding(source, "end each");
  }
}
