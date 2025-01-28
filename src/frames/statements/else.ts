import { AbstractFrame } from "../abstract-frame";
import { CodeSource, CodeSourceFromString } from "../code-source";
import { mustBeOfType } from "../compile-rules";
import { ExpressionField } from "../fields/expression-field";
import { IfSelector } from "../fields/if-selector";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { elseKeyword, thenKeyword } from "../keywords";
import { BooleanType } from "../symbols/boolean-type";
import { Transforms } from "../syntax-nodes/transforms";

export class Else extends AbstractFrame implements Statement {
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

  protected setClasses() {
    super.setClasses();
    this.pushClass(true, "outdent");
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

  indent() {
    return this.getParent()!.indent(); //overrides the additional indent added for most child statements
  }

  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0">${this.bpAsHtml}<el-top>
    <el-kw>${elseKeyword} </el-kw>${this.ifClauseAsHtml()}${this.hasIf ? "<el-kw> " + thenKeyword + "</el-kw>" : ""}</el-top>${this.compileMsgAsHtml()}${this.getFrNo()}${this.contextMenu()}</el-statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}${elseKeyword}${this.ifClauseAsSource()}${this.hasIf ? " " + thenKeyword : ""}`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    return `${this.indent()}} else ${this.compileIfClause(transforms)}`;
  }

  parseFrom(source: CodeSource): void {
    source.remove("else");
    if (source.isMatch(" if ")) {
      this.hasIf = true;
      source.remove(" if ");
      const condition = source.readUntil(/\sthen/);
      this.condition.parseFrom(new CodeSourceFromString(condition));
      source.remove(" then");
    }
  }
}
