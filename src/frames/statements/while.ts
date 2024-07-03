import { ExpressionField } from "../fields/expression-field";
import { Parent } from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { FrameWithStatements } from "../frame-with-statements";
import { whileKeyword } from "../keywords";
import { mustBeOfType } from "../compile-rules";
import { BooleanType } from "../symbols/boolean-type";
import { Transforms } from "../syntax-nodes/transforms";

export class While extends FrameWithStatements {
  isStatement = true;
  condition: ExpressionField;

  constructor(parent: Parent) {
    super(parent);
    this.condition = new ExpressionField(this);
    this.condition.setPlaceholder("condition");
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
  renderAsHtml(): string {
    return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<top><expand>+</expand><keyword>while </keyword>${this.condition.renderAsHtml()}</top>${this.compileMsgAsHtml()}
${this.renderChildrenAsHtml()}
<keyword>end while</keyword>
</statement>`;
  }
  renderAsSource(): string {
    return `${this.indent()}while ${this.condition.renderAsSource()}\r
${this.renderChildrenAsSource()}\r
${this.indent()}end while`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    mustBeOfType(
      this.condition.getOrTransformAstNode(transforms),
      BooleanType.Instance,
      this.compileErrors,
      this.htmlId,
    );

    return `${this.indent()}while (${this.condition.compile(transforms)}) {\r
${this.compileStatements(transforms)}\r
${this.indent()}}`;
  }

  parseTop(source: CodeSource): void {
    source.remove("while ");
    this.condition.parseFrom(source);
  }
  parseBottom(source: CodeSource): boolean {
    return this.parseStandardEnding(source, "end while");
  }
}
