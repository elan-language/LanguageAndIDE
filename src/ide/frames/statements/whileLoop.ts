import { endKeyword, whileKeyword } from "../../../compiler/elan-keywords";
import { AbstractField, expressionFieldSpec } from "../fields/abstract-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { FrameWithStatements } from "../frame-with-statements";

export class WhileLoop extends FrameWithStatements {
  isStatement = false;
  condition: AbstractField;
  constructor(parent: Parent) {
    super(parent);
    this.condition = new AbstractField(this, expressionFieldSpec);
    this.condition.setPlaceholder("<i>condition</i>");
  }
  initialKeywords(): string {
    return whileKeyword;
  }
  getFields(): Field[] {
    return [this.condition];
  }

  getIdPrefix(): string {
    return `${this.language().languageHtmlClass}_while`;
  }

  frameSpecificAnnotation(): string {
    return "";
  }

  outerHtmlTag: string = "el-statement";

  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}while ${this.condition.renderAsElanSource()}\r
${this.renderChildrenAsElanSource()}\r
${this.indent()}end while`;
  }

  parseTop(source: CodeSource): void {
    source.remove(`${whileKeyword} `);
    this.condition.parseFrom(source);
  }
  parseBottom(source: CodeSource): boolean {
    return this.parseStandardEnding(source, `${endKeyword} ${whileKeyword}`);
  }
}
