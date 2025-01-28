import { CodeSource } from "../code-source";
import { mustBeOfType } from "../compile-rules";
import { ExpressionField } from "../fields/expression-field";
import { FrameWithStatements } from "../frame-with-statements";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { repeatKeyword } from "../keywords";
import { BooleanType } from "../symbols/boolean-type";
import { Transforms } from "../syntax-nodes/transforms";

export class Repeat extends FrameWithStatements implements Statement {
  isStatement: boolean = true;
  condition: ExpressionField;

  constructor(parent: Parent) {
    super(parent);
    this.condition = new ExpressionField(this);
    this.condition.setPlaceholder("<i>condition</i>");
  }
  initialKeywords(): string {
    return repeatKeyword;
  }
  getFields(): Field[] {
    return [this.condition];
  }

  getIdPrefix(): string {
    return "repeat";
  }
  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
${this.bpAsHtml}<el-top><el-expand>+</el-expand><el-kw>repeat</el-kw></el-top>${this.getFrNo()}
${this.renderChildrenAsHtml()}
<el-kw>end repeat when </el-kw>${this.condition.renderAsHtml()}
${this.compileMsgAsHtml()}${this.contextMenu()}</el-statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}repeat\r
${this.renderChildrenAsSource()}\r
${this.indent()}end repeat when ${this.condition.renderAsSource()}`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    mustBeOfType(
      this.condition.getOrTransformAstNode(transforms),
      BooleanType.Instance,
      this.compileErrors,
      this.htmlId,
    );

    return `${this.indent()}${this.breakPoint(this.debugSymbols())}do {\r
${this.compileStatements(transforms)}\r
${this.indent()}} while (!(${this.condition.compile(transforms)}));`;
  }

  parseTop(source: CodeSource): void {
    source.remove("repeat");
  }
  parseBottom(source: CodeSource): boolean {
    let result = false;
    if (this.parseStandardEnding(source, "end repeat when ")) {
      this.condition.parseFrom(source);
      result = true;
    }
    return result;
  }
}
