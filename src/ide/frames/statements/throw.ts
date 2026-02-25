import { exceptionKeyword, throwKeyword } from "../../../compiler/elan-keywords";
import { ExceptionMessageField } from "../fields/exception-message-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { SingleLineFrame } from "../single-line-frame";

export class Throw extends SingleLineFrame implements Statement {
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
  getFieldsDefaultImpl(): Field[] {
    return [this.text];
  }
  getIdPrefix(): string {
    return "throw";
  }

  frameSpecificAnnotation(): string {
    return "throw";
  }

  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${throwKeyword} ${exceptionKeyword} ${this.text.renderAsElanSource()}`;
  }
}
