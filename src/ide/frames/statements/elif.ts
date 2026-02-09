import { elifKeyword, elseKeyword, thenKeyword } from "../../../compiler/keywords";
import { CodeSourceFromString } from "../code-source-from-string";
import { ExpressionField } from "../fields/expression-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { SingleLineFrame } from "../single-line-frame";

export class Elif extends SingleLineFrame implements Statement {
  isStatement: boolean = true;
  hasIf: boolean = true;
  condition: ExpressionField;
  constructor(parent: Parent) {
    super(parent);
    this.condition = new ExpressionField(this);
    this.condition.setPlaceholder("<i>condition</i>");
  }

  protected setClasses() {
    super.setClasses();
    this.pushClass(true, "outdent");
  }

  initialKeywords(): string {
    return elseKeyword;
  }

  getFieldsDefaultImpl(): Field[] {
    return [this.condition];
  }

  getIdPrefix(): string {
    return "else";
  }

  frameSpecificAnnotation(): string {
    return "elif";
  }

  indent() {
    return this.getParent()!.indent(); //overrides the additional indent added for most child statements
  }

  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${elifKeyword} ${this.condition.renderAsElanSource()} ${thenKeyword}`;
  }

  parseFrom(source: CodeSource): void {
    source.remove(`${elifKeyword} `);
    const condition = source.readUntil(/\sthen/);
    this.condition.parseFrom(new CodeSourceFromString(condition));
    source.remove(` ${thenKeyword}`);
  }
}
