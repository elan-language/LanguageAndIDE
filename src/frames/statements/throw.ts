import { ExceptionMessage } from "../fields/exception-message";
import { Parent } from "../interfaces/parent";
import { AbstractFrame } from "../abstract-frame";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { Statement } from "../interfaces/statement";
import { throwKeyword } from "../keywords";
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
    source.remove("throw ");
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
    return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>throw </keyword>${this.text.renderAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}throw ${this.text.renderAsSource()}`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    return `${this.indent()}throw new Error(${this.text.compile(transforms)});`;
  }
}
