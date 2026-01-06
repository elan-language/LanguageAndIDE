import { forKeyword } from "../../../compiler/keywords";
import { ExpressionField } from "../fields/expression-field";
import { IdentifierField } from "../fields/identifier-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { FrameWithStatements } from "../frame-with-statements";

export class For extends FrameWithStatements implements Statement {
  isStatement: boolean = true;
  variable: IdentifierField;
  from: ExpressionField;
  to: ExpressionField;
  step: ExpressionField;
  constructor(parent: Parent) {
    super(parent);
    this.variable = new IdentifierField(this);
    this.variable.setPlaceholder("<i>counterName</i>");
    this.from = new ExpressionField(this, / to /);
    this.from.setPlaceholder("<i>firstValue</i>");
    this.to = new ExpressionField(this, / step /);
    this.to.setPlaceholder("<i>lastValue</i>");
    this.step = new ExpressionField(this);
    this.step.setPlaceholder("<i>stepValue</i>");
    this.step.setFieldToKnownValidText("1");
  }

  initialKeywords(): string {
    return forKeyword;
  }

  getFields(): Field[] {
    return [this.variable, this.from, this.to, this.step];
  }

  getIdPrefix(): string {
    return "for";
  }

  outerHtmlTag: string = "el-statement";

  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}for ${this.variable.renderAsElanSource()} from ${this.from.renderAsElanSource()} to ${this.to.renderAsElanSource()} step ${this.step.renderAsElanSource()}\r
${this.renderChildrenAsSource()}\r
${this.indent()}end for`;
  }

  parseTop(source: CodeSource): void {
    source.remove("for ");
    this.variable.parseFrom(source);
    source.remove(" from ");
    this.from.parseFrom(source);
    source.remove(" to ");
    this.to.parseFrom(source);
    source.remove(" step ");
    this.step.parseFrom(source);
  }
  parseBottom(source: CodeSource): boolean {
    return this.parseStandardEnding(source, "end for");
  }
}
