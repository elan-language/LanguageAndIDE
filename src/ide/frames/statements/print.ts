import { printKeyword } from "../../../compiler/keywords";
import { ExpressionField } from "../fields/expression-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { SingleLineStatement } from "../single-line-statement";

export class Print extends SingleLineStatement implements Statement {
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

  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}print ${this.expr.renderAsElanSource()}`;
  }
}
