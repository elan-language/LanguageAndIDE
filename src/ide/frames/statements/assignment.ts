import { FieldImpl } from "../fields/field-impl";
import { assignableFieldSpec, expressionFieldSpec } from "../fields/field-spec";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { FrameType } from "../frame-type";
import { SingleLineFrame } from "../single-line-frame";

export class Assignment extends SingleLineFrame implements Statement {
  frameType: FrameType = FrameType.assertStatement;
  isStatement = true;
  assignable: FieldImpl;
  expr: FieldImpl;
  constructor(parent: Parent) {
    super(parent);
    this.assignable = new FieldImpl(this, assignableFieldSpec);
    this.assignable.setPlaceholder("<i>variableName</i>");
    this.expr = new FieldImpl(this, expressionFieldSpec);
  }

  helpId(): string {
    return "assignment";
  }

  getFields(): Field[] {
    return [this.assignable, this.expr];
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_set`;
  }
}
