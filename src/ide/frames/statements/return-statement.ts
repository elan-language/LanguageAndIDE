import { returnKeyword } from "../../../compiler/elan-keywords";
import { ExpressionField } from "../fields/expression-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { SingleLineFrame } from "../single-line-frame";

export class ReturnStatement extends SingleLineFrame implements Statement {
  isStatement = true;
  isReturnStatement = true;
  expr: ExpressionField;
  constructor(parent: Parent) {
    super(parent);
    this.ghostable = false;
    this.expr = new ExpressionField(this);
  }
  initialKeywords(): string {
    return returnKeyword;
  }
  override isDeletable() {
    return false;
  }
  override isMovable(): boolean {
    return false;
  }

  getFieldsDefaultImpl(): Field[] {
    return [this.expr];
  }

  getIdPrefix(): string {
    return "return";
  }

  frameSpecificAnnotation(): string {
    return "";
  }

  renderAsElanSource(): string {
    return `${this.indent()}return ${this.expr.renderAsElanSource()}`;
  }

  parseFrom(source: CodeSource): void {
    source.removeIndent();
    source.remove("return ");
    this.expr.parseFrom(source);
  }

  canInsertAfter(): boolean {
    return false;
  }
}
