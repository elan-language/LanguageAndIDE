import { mustBeOfType } from "../compile-rules";
import { ExpressionField } from "../fields/expression-field";
import { FrameWithStatements } from "../frame-with-statements";
import { CodeSource } from "../interfaces/code-source";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { Transforms } from "../interfaces/transforms";
import { endKeyword, whileKeyword } from "../keywords";
import { BooleanType } from "../symbols/boolean-type";

export class While extends FrameWithStatements {
  isStatement = true;
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
  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}>
<el-top>${this.contextMenu()}${this.bpAsHtml()}<el-expand>+</el-expand><el-kw>while </el-kw>${this.condition.renderAsHtml()}${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
${this.renderChildrenAsHtml()}
<el-kw>end while</el-kw>
</el-statement>`;
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

    return `${this.indent()}${this.breakPoint(this.debugSymbols())}while (${this.condition.compile(transforms)}) {\r
${this.compileChildren(transforms)}\r
${this.indent()}}`;
  }

  parseTop(source: CodeSource): void {
    source.remove(`${whileKeyword} `);
    this.condition.parseFrom(source);
  }
  parseBottom(source: CodeSource): boolean {
    return this.parseStandardEnding(source, `${endKeyword} ${whileKeyword}`);
  }
}
