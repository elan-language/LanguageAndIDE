import { FieldImpl } from "../fields/field-impl";
import { identifierFieldSpec, expressionFieldSpec } from "../fields/field-spec";
import { Field } from "../frame-interfaces/field";
import { File } from "../frame-interfaces/file";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { FrameType } from "../frame-type";
import { FrameWithStatements } from "../frame-with-statements";

export class ForLoop extends FrameWithStatements implements Statement {
  frameType: FrameType = FrameType.forLoop;
  isStatement = true;
  variable: FieldImpl;
  iter: FieldImpl;
  constructor(parent: File | Parent) {
    super(parent);
    this.variable = new FieldImpl(this, identifierFieldSpec);
    this.variable.setPlaceholder("<i>item</i>");
    this.iter = new FieldImpl(this, expressionFieldSpec);
    this.iter.setPlaceholder("<i>source</i>");
  }

  helpId(): string {
    return "enum";
  }

  getFields(): Field[] {
    return [this.variable, this.iter];
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_for`;
  }

  outerHtmlTag: string = "el-statement";
}
