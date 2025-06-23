import { AbstractFrame } from "../abstract-frame";

import { ExpressionField } from "../fields/expression-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { printKeyword } from "../keywords";

export class Print extends AbstractFrame implements Statement {
  isStatement = true;
  expr: ExpressionField;
  constructor(parent: Parent) {
    super(parent);
    this.expr = new ExpressionField(this);
    this.expr.setOptional(true);
    this.expr.setPlaceholder("<i>expression</i>");
  }
  initialKeywords(): string {
    return printKeyword;
  }
  parseFrom(source: CodeSource): void {
    source.removeIndent();
    source.remove("print");
    this.expr.parseFrom(source);
    source.removeNewLine();
  }
  getFields(): Field[] {
    return [this.expr];
  }
  getIdPrefix(): string {
    return "print";
  }

  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}>${this.contextMenu()}${this.bpAsHtml()}<el-kw>print </el-kw>${this.expr.renderAsHtml()}${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}print ${this.expr.renderAsSource()}`;
  }
}
