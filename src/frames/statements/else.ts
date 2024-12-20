import { CodeSource } from "../code-source";
import { mustBeOfType } from "../compile-rules";
import { ExpressionField } from "../fields/expression-field";
import { IfSelector } from "../fields/if-selector";
import { singleIndent } from "../frame-helpers";
import { FrameWithStatements } from "../frame-with-statements";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { elseKeyword } from "../keywords";
import { BooleanType } from "../symbols/boolean-type";
import { Transforms } from "../syntax-nodes/transforms";

export class Else extends FrameWithStatements implements Statement {
  isStatement: boolean = true;
  selectIfClause: IfSelector;
  hasIf: boolean = false;
  condition: ExpressionField;

  constructor(parent: Parent) {
    super(parent);
    this.condition = new ExpressionField(this);
    this.condition.setPlaceholder("<i>condition</i>");
    this.selectIfClause = new IfSelector(this);
  }

  initialKeywords(): string {
    return elseKeyword;
  }

  getFields(): Field[] {
    return this.hasIf ? [this.condition] : [this.selectIfClause];
  }

  setIfExtension(to: boolean) {
    this.hasIf = to;
  }

  getIdPrefix(): string {
    return "else";
  }
  private ifClauseAsHtml(): string {
    return this.hasIf
      ? `<el-kw>if </el-kw>${this.condition.renderAsHtml()}`
      : `${this.selectIfClause.renderAsHtml()}`;
  }

  private ifClauseAsSource(): string {
    return this.hasIf ? ` if ${this.condition.renderAsSource()}` : ``;
  }

  private compileIfClause(transforms: Transforms): string {
    if (this.hasIf) {
      mustBeOfType(
        this.condition.getOrTransformAstNode(transforms),
        BooleanType.Instance,
        this.compileErrors,
        this.htmlId,
      );
      return `if (${this.condition.compile(transforms)}) {`;
    }
    return `{`;
  }

  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">
    <el-top><el-expand>+</el-expand><el-kw>else </el-kw>${this.ifClauseAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-top>
${this.renderChildrenAsHtml()}
</el-statement>`;
  }

  indent(): string {
    return this.getParent()?.indent() + singleIndent();
  }

  renderAsSource(): string {
    return `${this.indent()}else${this.ifClauseAsSource()}\r
${this.renderChildrenAsSource()}`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    return `${this.indent()}} else ${this.compileIfClause(transforms)}\r
${this.compileStatements(transforms)}\r`;
  }

  parseTop(source: CodeSource): void {
    source.remove("else");
    if (source.isMatch(" if ")) {
      this.hasIf = true;
      source.remove(" if ");
      this.condition.parseFrom(source);
    }
  }
  parseBottom(source: CodeSource): boolean {
    let result = false;
    source.removeIndent();
    if (source.isMatch("else")) {
      result = true;
    } else if (source.isMatch("end if")) {
      result = true;
    }
    return result;
  }
}
