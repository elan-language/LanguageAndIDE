import { CodeSource } from "../code-source";
import { ExpressionField } from "../fields/expression-field";
import { singleIndent } from "../frame-helpers";
import { FrameWithStatements } from "../frame-with-statements";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { endKeyword, onKeyword, switchKeyword } from "../keywords";
import { SymbolScope } from "../symbols/symbol-scope";
import { Transforms } from "../syntax-nodes/transforms";
import { MatchStatement } from "./match-statement";
import { OtherwiseStatement } from "./otherwise-statement";

export class Switch extends FrameWithStatements implements ElanSymbol {
  isStatement = true;
  expr: ExpressionField;

  constructor(parent: Parent) {
    super(parent);
    this.expr = new ExpressionField(this);
    const select = this.getChildren()[0];
    const match1 = new MatchStatement(this);
    this.addChildBefore(match1, select);
    match1.makeImmovable();
  }

  get symbolId() {
    return "_";
  }

  symbolType(transforms?: Transforms) {
    return this.expr.symbolType(transforms);
  }

  get symbolScope() {
    return SymbolScope.local;
  }

  initialKeywords(): string {
    return switchKeyword;
  }
  minimumNumberOfChildrenExceeded(): boolean {
    return this.getChildren().length > 2; //otherwise +
  }

  getFields(): Field[] {
    return [this.expr];
  }

  getIdPrefix(): string {
    return "switch";
  }
  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
<el-top><el-expand>+</el-expand><el-kw>${switchKeyword} ${onKeyword} </el-kw>${this.expr.renderAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
${this.renderChildrenAsHtml()}
<el-kw>${this.endSwitch}<el-kw>
</el-statement>`;
  }
  renderAsSource(): string {
    return `${this.indent()}${switchKeyword} ${onKeyword} ${this.expr.renderAsSource()}\r
${this.renderChildrenAsSource()}\r
${this.indent()}${this.endSwitch}`;
  }

  customIndent(i: number) {
    let indent = this.indent();
    for (i; i--; i > 0) {
      indent = `${indent}${singleIndent()}`;
    }
    return indent;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];

    const hasOtherwise =
      this.getChildren().filter((f) => f instanceof OtherwiseStatement).length > 0;
    const expr = this.expr.compile(transforms);

    const generatedOtherwise = hasOtherwise
      ? ""
      : `\n${this.customIndent(1)}break;\r\n${this.indent()}default:\r
${this.customIndent(1)}system.unhandledExpression(${expr});\r`;

    return `${this.indent()}${switchKeyword} (${expr}) {\r
${this.compileStatements(transforms)}\r${generatedOtherwise}
${this.customIndent(1)}break;\r
${this.indent()}}`;
  }

  parseTop(source: CodeSource): void {
    source.remove(`${switchKeyword} ${onKeyword} `);
    this.expr.parseFrom(source);
    source.removeNewLine();
    source.removeIndent();
    this.getFirstChild().parseFrom(source);
  }
  parseBottom(source: CodeSource): boolean {
    source.removeIndent();
    return this.parseStandardEnding(source, this.endSwitch);
  }

  endSwitch = `${endKeyword} ${switchKeyword}`;
}
