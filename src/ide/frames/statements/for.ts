import { forKeyword } from "../../../compiler/elan-keywords";
import { ExpressionField } from "../fields/expression-field";
import { ForToField } from "../fields/for-to-field";
import { IdentifierField } from "../fields/identifier-field";
import { StepField } from "../fields/step-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { FrameWithStatements } from "../frame-with-statements";

export class For extends FrameWithStatements implements Statement {
  isStatement: boolean = true;
  variable: IdentifierField;
  from: ExpressionField;
  to: ForToField;
  step: StepField;

  constructor(parent: Parent) {
    super(parent);
    this.variable = new IdentifierField(this);
    this.variable.setPlaceholder("<i>counterName</i>");
    this.from = new ExpressionField(this, / to /);
    this.from.setPlaceholder("<i>inclusive first value</i>");
    this.to = new ForToField(this, / step /);
    this.to.setPlaceholder("<i>exclusive final value</i>");
    this.step = new StepField(this);
  }

  initialKeywords(): string {
    return forKeyword;
  }

  getFieldsDefaultImpl(): Field[] {
    return [this.variable, this.from, this.to, this.step];
  }

  getIdPrefix(): string {
    return "for";
  }

  frameSpecificAnnotation(): string {
    return "";
  }

  outerHtmlTag: string = "el-statement";

  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}for ${this.variable.renderAsElanSource()} from ${this.from.renderAsElanSource()} to ${this.to.renderAsElanSource()} step ${this.step.renderAsElanSource()}\r
${this.renderChildrenAsElanSource()}\r
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
