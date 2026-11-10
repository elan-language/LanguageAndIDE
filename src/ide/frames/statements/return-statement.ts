import { FieldImpl } from "../fields/field-impl";
import { expressionFieldSpec } from "../fields/field-spec";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { FrameType } from "../frame-type";
import { SingleLineFrame } from "../single-line-frame";

export class ReturnStatement extends SingleLineFrame implements Statement {
  frameType: FrameType = FrameType.returnStatement;
  isStatement = true;
  isReturnStatement = true;
  expr: FieldImpl;
  constructor(parent: Parent) {
    super(parent);
    this.ghostable = false;
    this.expr = new FieldImpl(this, expressionFieldSpec);
  }

  helpId(): string {
    return "return";
  }

  override isDeletable() {
    return false;
  }
  override isMovable(): boolean {
    return false;
  }
  override canInsertAfter(): boolean {
    return false;
  }

  getFields(): Field[] {
    return [this.expr];
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_return`;
  }
}
