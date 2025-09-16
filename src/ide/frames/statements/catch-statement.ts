import { catchKeyword, exceptionKeyword, inKeyword } from "../../../compiler/keywords";
import { AbstractFrame } from "../abstract-frame";
import { IdentifierField } from "../fields/identifier-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";

export class CatchStatement extends AbstractFrame implements Statement {
  isStatement = true;
  isCatch = true;
  variable: IdentifierField;
  constructor(parent: Parent) {
    super(parent);
    this.variable = new IdentifierField(this);
    this.variable.setPlaceholder("<i>variableName</i>");
    this.variable.setFieldToKnownValidText("e");
    this._movable = true;
  }

  override deleteIfPermissible(): void {} // does nothing - catch can't be deleted

  protected setClasses() {
    super.setClasses();
    this.pushClass(true, "outdent");
  }

  initialKeywords(): string {
    return catchKeyword;
  }

  getFields(): Field[] {
    return [this.variable];
  }

  getIdPrefix(): string {
    return "catch";
  }

  indent() {
    return this.getParent()!.indent(); //overrides the additional indent added for most child statements
  }

  parentIndent(): string {
    return this.getParent().indent();
  }

  keywords = `${catchKeyword} ${exceptionKeyword} ${inKeyword} `;

  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="-1"><el-top>${this.contextMenu()}${this.bpAsHtml()}<el-expand>+</el-expand><el-kw>${this.keywords}</el-kw>${this.variable.renderAsHtml()}${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-top></el-statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}${this.keywords}${this.variable.renderAsSource()}`;
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
  override isGhostedOrWithinAGhostedFrame(): boolean {
    return false;
  }
}
