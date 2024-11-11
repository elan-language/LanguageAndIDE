import { AbstractFrame } from "../abstract-frame";
import { CodeSource } from "../code-source";
import { ExceptionMessage } from "../fields/exception-message";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { exceptionKeyword, throwKeyword } from "../keywords";
import { Transforms } from "../syntax-nodes/transforms";

export class Throw extends AbstractFrame implements Statement {
  isStatement = true;
  text: ExceptionMessage;

  constructor(parent: Parent) {
    super(parent);
    this.text = new ExceptionMessage(this);
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
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><el-kw>${throwKeyword} ${exceptionKeyword} </el-kw>${this.text.renderAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}${throwKeyword} ${exceptionKeyword} ${this.text.renderAsSource()}`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    return `${this.indent()}throw new Error(${this.text.compile(transforms)});`;
  }
}
