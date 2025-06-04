import { AbstractFrame } from "../abstract-frame";
import { ExceptionMessageField } from "../fields/exception-message-field";
import { CodeSource } from "../interfaces/code-source";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { exceptionKeyword, throwKeyword } from "../keywords";

export class Throw extends AbstractFrame implements Statement {
  isStatement = true;
  text: ExceptionMessageField;
  hrefForFrameHelp: string = "LangRef.html#throw";

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
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}>${this.contextMenu()}${this.bpAsHtml()}<el-kw>${throwKeyword} ${exceptionKeyword} </el-kw>${this.text.renderAsHtml()}${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}${throwKeyword} ${exceptionKeyword} ${this.text.renderAsSource()}`;
  }
}
