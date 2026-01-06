import { setKeyword, toKeyword } from "../../../compiler/keywords";
import { AssignableField } from "../fields/assignableField";
import { ExpressionField } from "../fields/expression-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { SingleLineStatement } from "../single-line-statement";

export class SetStatement extends SingleLineStatement implements Statement {
  isStatement = true;
  assignable: AssignableField;
  expr: ExpressionField;
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

  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${setKeyword} ${this.assignable.renderAsElanSource()} ${toKeyword} ${this.expr.renderAsElanSource()}`;
  }
}
