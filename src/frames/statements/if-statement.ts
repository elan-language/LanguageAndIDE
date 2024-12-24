import { CodeSource } from "../code-source";
import { mustBeOfType, mustNotHaveConditionalAfterUnconditionalElse } from "../compile-rules";
import { ExpressionField } from "../fields/expression-field";
import { FrameWithStatements } from "../frame-with-statements";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { endKeyword, ifKeyword, thenKeyword } from "../keywords";
import { BooleanType } from "../symbols/boolean-type";
import { Transforms } from "../syntax-nodes/transforms";
import { Else } from "./else";

export class IfStatement extends FrameWithStatements implements Statement {
  isStatement = true;
  condition: ExpressionField;

  constructor(parent: Parent) {
    super(parent);
    this.condition = new ExpressionField(this);
    this.condition.setPlaceholder("<i>condition</i>");
    const selector = this.getChildren().pop()!; //added by superclass
    this.getChildren().push(selector);
  }

  initialKeywords(): string {
    return ifKeyword;
  }

  getFields(): Field[] {
    return [this.condition];
  }
  getIdPrefix(): string {
    return "if";
  }

  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<el-top><el-expand>+</el-expand><el-kw>${ifKeyword} </el-kw>${this.condition.renderAsHtml()}<el-kw> ${thenKeyword}</el-kw>${this.getFrNo()}</el-top>${this.compileMsgAsHtml()}
${this.renderChildrenAsHtml()}
<el-kw>${endKeyword} ${ifKeyword}</el-kw>
</el-statement>`;
  }
  renderAsSource(): string {
    return `${this.indent()}${ifKeyword} ${this.condition.renderAsSource()} ${thenKeyword}\r
${this.renderChildrenAsSource()}\r
${this.indent()}${endKeyword} ${ifKeyword}`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];

    mustBeOfType(
      this.condition.getOrTransformAstNode(transforms),
      BooleanType.Instance,
      this.compileErrors,
      this.htmlId,
    );
    const elses = this.getChildren().filter((c) => c instanceof Else) as Else[];
    if (elses.length > 0) {
      mustNotHaveConditionalAfterUnconditionalElse(elses, this.compileErrors, this.htmlId);
    }

    return `${this.indent()}if (${this.condition.compile(transforms)}) {\r
${this.compileStatements(transforms)}\r
${this.indent()}}`;
  }

  parseTop(source: CodeSource): void {
    source.remove("if ");
    this.condition.parseFrom(source);
    source.removeNewLine();
  }

  parseBottom(source: CodeSource): boolean {
    source.removeIndent();
    return this.parseStandardEnding(source, "end if");
  }

  override insertSelectorAfterLastField(): void {
    this.getFirstChild().select(true, false);
  }
}
