import { FieldImpl } from "../fields/field-impl";
import { procRefFieldSpec } from "../fields/field-spec";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { FrameType } from "../frame-type";
import { SingleLineFrame } from "../single-line-frame";

export class ProcedureCall extends SingleLineFrame implements Statement {
  frameType: FrameType = FrameType.procedureCall;
  isStatement = true;
  isCall = true;
  procRef: FieldImpl;

  constructor(parent: Parent) {
    super(parent);
    this.procRef = new FieldImpl(this, procRefFieldSpec);
    this.procRef.setPlaceholder("<i>procedureName</i>");
  }

  helpId(): string {
    return "call";
  }

  getFields(): Field[] {
    return [this.procRef];
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_call`;
  }
}
