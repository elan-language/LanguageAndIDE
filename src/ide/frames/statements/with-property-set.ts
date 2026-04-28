import { setKeyword, toKeyword, withKeyword } from "../../../compiler/elan-keywords";
import { AssignableField } from "../fields/assignableField";
import { ExpressionField } from "../fields/expression-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { SingleLineFrame } from "../single-line-frame";

export class WithPropertySet extends SingleLineFrame implements Statement {
  isStatement = true;
  assignable: AssignableField;
  expr: ExpressionField;
  constructor(parent: Parent) {
    super(parent);
    this.assignable = new AssignableField(this);
    this.assignable.setPlaceholder("<i>propertyName</i>");
    this.assignable.setFieldToKnownValidText("copyOfThis.");
    this.expr = new ExpressionField(this);
  }
  initialKeywords(): string {
    return withKeyword;
  }

  parseFrom(source: CodeSource): void {
    source.removeIndent();
    source.remove(`${withKeyword} `);
    this.assignable.parseFrom(source);
    source.remove(`${setKeyword} ${toKeyword}`);
    this.expr.parseFrom(source);
    source.removeNewLine();
  }
  getFields(): Field[] {
    return [this.assignable, this.expr];
  }

  getIdPrefix(): string {
    return "with";
  }

  frameSpecificAnnotation(): string {
    return "with property set";
  }

  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${withKeyword} ${this.assignable.renderAsElanSource()} ${setKeyword} ${toKeyword} ${this.expr.renderAsElanSource()}`;
  }
}
