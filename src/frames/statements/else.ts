import { AbstractFrame } from "../abstract-frame";
import { CodeSourceFromString } from "../code-source-from-string";
import { ExpressionField } from "../fields/expression-field";
import { IfSelectorField } from "../fields/if-selector-field";
import { CodeSource } from "../interfaces/code-source";
import { Field } from "../interfaces/field";
import { Frame } from "../interfaces/frame";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { elseKeyword, thenKeyword } from "../keywords";

export class Else extends AbstractFrame implements Statement {
  isStatement: boolean = true;
  selectIfClause: IfSelectorField;
  hasIf: boolean = false;
  condition: ExpressionField;
  constructor(parent: Parent) {
    super(parent);
    this.condition = new ExpressionField(this);
    this.condition.setPlaceholder("<i>condition</i>");
    this.selectIfClause = new IfSelectorField(this);
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

  indent() {
    return this.getParent()!.indent(); //overrides the additional indent added for most child statements
  }

  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}><el-top>${this.contextMenu()}${this.bpAsHtml()}
    <el-kw>${elseKeyword} </el-kw>${this.ifClauseAsHtml()}${this.hasIf ? "<el-kw> " + thenKeyword + "</el-kw>" : ""}${this.helpAsHtml()}</el-top>${this.compileMsgAsHtml()}${this.getFrNo()}</el-statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}${elseKeyword}${this.ifClauseAsSource()}${this.hasIf ? " " + thenKeyword : ""}`;
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

  compileChildren: Frame[] = [];

  addChild(f: Frame) {
    this.compileChildren.push(f);
  }

  getChildRange(initialScope: Frame) {
    const fst = this.compileChildren[0];
    const fi = this.compileChildren.indexOf(fst);
    const li = this.compileChildren.indexOf(initialScope);

    return fi < li
      ? this.compileChildren.slice(fi, li + 1)
      : this.compileChildren.slice(li, fi + 1);
  }
}
