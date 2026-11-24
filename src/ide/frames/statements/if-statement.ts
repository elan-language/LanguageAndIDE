import { FieldImpl } from "../fields/field-impl";
import { expressionFieldSpec } from "../fields/field-spec";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";
import { FrameType } from "../frame-type";
import { FrameWithStatements } from "../frame-with-statements";
import { ElseClause } from "./else-clause";
import { ThenClause } from "./then-clause";

export class IfStatement extends FrameWithStatements implements Statement {
  frameType: FrameType = FrameType.ifStatement;
  isStatement = true;
  condition: FieldImpl;
  constructor(parent: Parent) {
    super(parent);
    this.condition = new FieldImpl(this, expressionFieldSpec);
    this.condition.setPlaceholder("<i>condition</i>");
    const selector = this.getFirstChild();
    this.addChildBefore(new ThenClause(this), selector);
    this.removeChild(selector);
  }

  helpId(): string {
    return "if";
  }

  getFields(): Field[] {
    return [this.condition];
  }
  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_if`;
  }

  outerHtmlTag: string = "el-statement";

  override insertSelectorAfterLastField(): void {
    this.getFirstChild().select(true, false);
  }

  hasElseClause(): boolean {
    return this.getChildren().filter((s) => s instanceof ElseClause).length > 0;
  }

  override selectNextFrame(): void {
    this.getFirstChild().selectNextFrame(); // i.e. the first statement (or selector) within the then-clause
  }
}
