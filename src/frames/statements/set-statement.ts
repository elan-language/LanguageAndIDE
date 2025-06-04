import { AbstractFrame } from "../abstract-frame";
import { AssignableField } from "../fields/assignableField";
import { ExpressionField } from "../fields/expression-field";
import { CodeSource } from "../interfaces/code-source";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { setKeyword, toKeyword } from "../keywords";

export class SetStatement extends AbstractFrame implements Statement {
  isStatement = true;
  assignable: AssignableField;
  expr: ExpressionField;
  hrefForFrameHelp: string = "LangRef.html#set";

  constructor(parent: Parent) {
    super(parent);
    this.assignable = new AssignableField(this);
    this.assignable.setPlaceholder("<i>variableName</i>");
    this.expr = new ExpressionField(this);
  }
  initialKeywords(): string {
    return setKeyword;
  }

  parseFrom(source: CodeSource): void {
    source.removeIndent();
    source.remove("set ");
    this.assignable.parseFrom(source);
    source.remove(" to ");
    this.expr.parseFrom(source);
    source.removeNewLine();
  }
  getFields(): Field[] {
    return [this.assignable, this.expr];
  }
  getIdPrefix(): string {
    return "set";
  }
  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}>${this.contextMenu()}${this.bpAsHtml()}<el-kw>${setKeyword} </el-kw>${this.assignable.renderAsHtml()}<el-kw> ${toKeyword} </el-kw>${this.expr.renderAsHtml()}${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-statement>`;
  }
  renderAsSource(): string {
    return `${this.indent()}${setKeyword} ${this.assignable.renderAsSource()} ${toKeyword} ${this.expr.renderAsSource()}`;
  }
}
