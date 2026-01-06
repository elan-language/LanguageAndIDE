import { endKeyword, whileKeyword } from "../../../compiler/keywords";
import { ExpressionField } from "../fields/expression-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { FrameWithStatements } from "../frame-with-statements";

export class While extends FrameWithStatements {
  isStatement = false;
  condition: ExpressionField;
  constructor(parent: Parent) {
    super(parent);
    this.condition = new ExpressionField(this);
    this.condition.setPlaceholder("<i>condition</i>");
  }
  initialKeywords(): string {
    return whileKeyword;
  }
  getFields(): Field[] {
    return [this.condition];
  }

  getIdPrefix(): string {
    return "while";
  }

  outerHtmlTag: string = "el-statement";

  renderAsElanSource(): string {
    return `${this.indent()}${this.sourceAnnotations()}while ${this.condition.renderAsElanSource()}\r
${this.renderChildrenAsSource()}\r
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
