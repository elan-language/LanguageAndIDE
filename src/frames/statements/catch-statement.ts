import { IdentifierField } from "../fields/identifier-field";
import { FrameWithStatements } from "../frame-with-statements";
import { CodeSource } from "../interfaces/code-source";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { catchKeyword, exceptionKeyword, inKeyword } from "../keywords";

export class CatchStatement extends FrameWithStatements implements Statement {
  isStatement = true;
  isCatch = true;
  variable: IdentifierField;
  constructor(parent: Parent) {
    super(parent);
    this.variable = new IdentifierField(this);
    this.variable.setPlaceholder("<i>variableName</i>");
    this.variable.setFieldToKnownValidText("e");
    this.movable = false;
  }

  override deleteIfPermissible(): void {
    // does nothing - catch can't be deleted
  }

  canInsertAfter(): boolean {
    return false;
  }

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
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><el-top>${this.contextMenu()}${this.bpAsHtml()}<el-expand>+</el-expand><el-kw>${this.keywords}</el-kw>${this.variable.renderAsHtml()}${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
${this.renderChildrenAsHtml()}        
</el-statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}${this.keywords}${this.variable.renderAsSource()}\r
${this.renderChildrenAsSource()}`;
  }

  parseTop(source: CodeSource): void {
    source.removeIndent();
    source.remove(this.keywords);
    this.variable.parseFrom(source);
  }
  parseBottom(source: CodeSource): boolean {
    return this.parseStandardEnding(source, "end try");
  }
}
