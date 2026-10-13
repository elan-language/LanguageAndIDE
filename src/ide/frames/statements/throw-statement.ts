import { throwKeyword } from "../../../compiler/elan-keywords";
import {
  AbstractField,
  exceptionMessageFieldSpec,
  exceptionTypeFieldSpec,
} from "../fields/abstract-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { SingleLineFrame } from "../single-line-frame";

export class ThrowStatement extends SingleLineFrame implements Statement {
  isStatement = true;
  type: AbstractField;
  text: AbstractField;
  constructor(parent: Parent) {
    super(parent);
    this.text = new AbstractField(this, exceptionMessageFieldSpec);
    this.type = new AbstractField(this, exceptionTypeFieldSpec);
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
    return `${this.language().languageHtmlClass}_throw`;
  }

  frameSpecificAnnotation(): string {
    return "throw statement";
  }

  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}${throwKeyword} ${this.type.renderAsElanSource()} ${this.text.renderAsElanSource()}`;
  }
}
