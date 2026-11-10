import { endKeyword, whileKeyword } from "../../../compiler/elan-keywords";
import { FieldImpl } from "../fields/field-impl";
import { expressionFieldSpec } from "../fields/field-spec";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { FrameType } from "../frame-type";
import { FrameWithStatements } from "../frame-with-statements";

export class WhileLoop extends FrameWithStatements {
  frameType: FrameType = FrameType.whileLoop;
  isStatement = true;
  condition: FieldImpl;
  constructor(parent: Parent) {
    super(parent);
    this.condition = new FieldImpl(this, expressionFieldSpec);
    this.condition.setPlaceholder("<i>condition</i>");
  }

  helpId(): string {
    return "while"; // 'then' clause has no visible manifestation
  }

  getFields(): Field[] {
    return [this.condition];
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_while`;
  }

  outerHtmlTag: string = "el-statement";

  parseTop(source: CodeSource): void {
    source.remove(`${whileKeyword} `);
    this.condition.parseFrom(source);
  }
  parseBottom(source: CodeSource): boolean {
    return this.parseStandardEnding(source, `${endKeyword} ${whileKeyword}`);
  }
}
