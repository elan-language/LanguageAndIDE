import { throwKeyword } from "../../../compiler/elan-keywords";
import { ExceptionMessageField } from "../fields/exception-message-field";
import { ExceptionTypeField } from "../fields/exception-type-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { SingleLineFrame } from "../single-line-frame";

export class Throw extends SingleLineFrame implements Statement {
  isStatement = true;
  type: ExceptionTypeField;
  text: ExceptionMessageField;
  constructor(parent: Parent) {
    super(parent);
    this.text = new ExceptionMessageField(this);
    this.type = new ExceptionTypeField(this);
  }
  initialKeywords(): string {
    return throwKeyword;
  }
  parseFrom(source: CodeSource): void {
    source.removeIndent();
    source.remove(`${throwKeyword} `);
    this.type.parseFrom(source);
    source.remove(" ");
    this.text.parseFrom(source);
    source.removeNewLine();
  }
  getFields(): Field[] {
    return [this.type, this.text];
  }
  getIdPrefix(): string {
    return "throw";
  }

  frameSpecificAnnotation(): string {
    return "throw exception";
  }

  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${throwKeyword} ${this.type.renderAsElanSource()} ${this.text.renderAsElanSource()}`;
  }
}
