import { mustBeOfType } from "../compile-rules";
import { ExpressionField } from "../fields/expression-field";
import { FrameWithStatements } from "../frame-with-statements";
import { CodeSource } from "../interfaces/code-source";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { Transforms } from "../interfaces/transforms";
import { repeatKeyword } from "../keywords";
import { BooleanType } from "../symbols/boolean-type";

export class Repeat extends FrameWithStatements implements Statement {
  isStatement: boolean = true;
  condition: ExpressionField;
  hrefForFrameHelp: string = "LangRef.html#repeat";

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
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}>
<el-top>${this.contextMenu()}${this.bpAsHtml()}<el-expand>+</el-expand><el-kw>repeat</el-kw>${this.helpAsHtml()}</el-top>${this.getFrNo()}
${this.renderChildrenAsHtml()}
<el-kw>end repeat when </el-kw>${this.condition.renderAsHtml()}
${this.compileMsgAsHtml()}</el-statement>`;
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
${this.compileChildren(transforms)}\r
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
