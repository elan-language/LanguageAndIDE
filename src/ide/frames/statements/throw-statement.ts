import { FieldImpl } from "../fields/field-impl";
import { exceptionMessageFieldSpec, exceptionTypeFieldSpec } from "../fields/field-spec";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { FrameType } from "../frame-type";
import { SingleLineFrame } from "../single-line-frame";

export class ThrowStatement extends SingleLineFrame implements Statement {
  frameType: FrameType = FrameType.throwStatement;
  isStatement = true;
  type: FieldImpl;
  text: FieldImpl;
  constructor(parent: Parent) {
    super(parent);
    this.text = new FieldImpl(this, exceptionMessageFieldSpec);
    this.type = new FieldImpl(this, exceptionTypeFieldSpec);
    this.type.setFieldToKnownValidText("ElanRuntimeError");
  }

  helpId(): string {
    return "throw"; // 'then' clause has no visible manifestation
  }

  getFields(): Field[] {
    return [this.type, this.text];
  }

  override selectFirstField(): boolean {
    this.text.select();
    return true;
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_throw`;
  }
}
