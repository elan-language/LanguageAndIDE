import { AbstractFrame } from "../abstract-frame";
import { CodeSource } from "../code-source";
import { ExpressionField } from "../fields/expression-field";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { printKeyword } from "../keywords";
import { Transforms } from "../syntax-nodes/transforms";

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
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><el-kw>print </el-kw>${this.expr.renderAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}${this.contextMenu()}</el-statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}print ${this.expr.renderAsSource()}`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];

    const toPrint = this.expr.compile(transforms) || '""';
    return `${this.indent()}system.printLine(${toPrint});`;
  }
}
