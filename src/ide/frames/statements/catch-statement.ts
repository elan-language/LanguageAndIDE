import { catchKeyword, exceptionKeyword, inKeyword } from "../../../compiler/elan-keywords";
import { IdentifierField } from "../fields/identifier-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { SingleLineFrame } from "../single-line-frame";

export class CatchStatement extends SingleLineFrame implements Statement {
  isStatement = true;
  isCatch = true;
  variable: IdentifierField;
  constructor(parent: Parent) {
    super(parent);
    this.variable = new IdentifierField(this);
    this.variable.setPlaceholder("<i>variableName</i>");
    this.variable.setFieldToKnownValidText("e");
    this.ghostable = false;
  }

  override isDeletable(): boolean {
    return false;
  }
  override deleteIfPermissible(): void {} // does nothing - catch can't be deleted

  protected setClasses() {
    super.setClasses();
    this.pushClass(true, "outdent");
  }

  initialKeywords(): string {
    return catchKeyword;
  }

  getFieldsDefaultImpl(): Field[] {
    return [this.variable];
  }

  getIdPrefix(): string {
    return "catch";
  }

  frameSpecificAnnotation(): string {
    return "";
  }

  indent() {
    return this.getParent()!.indent(); //overrides the additional indent added for most child statements
  }

  parentIndent(): string {
    return this.getParent().indent();
  }

  keywords = `${catchKeyword} ${exceptionKeyword} ${inKeyword} `;

  renderAsElanSource(): string {
    return `${this.indent()}${this.keywords}${this.variable.renderAsElanSource()}`;
  }

  parseFrom(source: CodeSource): void {
    source.removeIndent();
    source.remove(this.keywords);
    this.variable.parseFrom(source);
    source.removeNewLine();
  }
  override isGhosted(): boolean {
    return false;
  }
}
