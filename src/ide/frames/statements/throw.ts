import { exceptionKeyword, throwKeyword } from "../../../compiler/keywords";
import { AbstractFrame } from "../abstract-frame";
import { ExceptionMessageField } from "../fields/exception-message-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";

export class Throw extends AbstractFrame implements Statement {
  isStatement = true;
  text: ExceptionMessageField;
  constructor(parent: Parent) {
    super(parent);
    this.text = new ExceptionMessageField(this);
  }
  initialKeywords(): string {
    return throwKeyword;
  }
  parseFrom(source: CodeSource): void {
    source.removeIndent();
    source.remove(`${throwKeyword} ${exceptionKeyword} `);
    this.text.parseFrom(source);
    source.removeNewLine();
  }
  getFields(): Field[] {
    return [this.text];
  }
  getIdPrefix(): string {
    return "throw";
  }
  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="-1" ${this.toolTip()}>${this.contextMenu()}${this.bpAsHtml()}${this.language().renderSingleLineAsHtml(this)}${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-statement>`;
  }

  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${throwKeyword} ${exceptionKeyword} ${this.text.renderAsElanSource()}`;
  }
}
