import { AbstractFrame } from "../abstract-frame";
import { AssignableField } from "../fields/assignableField";
import { ExpressionField } from "../fields/expression-field";
import { mapSymbolType } from "../frame-helpers";
import { CodeSource } from "../interfaces/code-source";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { Transforms } from "../interfaces/transforms";
import { setKeyword, toKeyword } from "../keywords";
import { getIds } from "../syntax-nodes/ast-helpers";

export class SetStatement extends AbstractFrame implements Statement {
  isStatement = true;
  assignable: AssignableField;
  expr: ExpressionField;
  hrefForFrameHelp: string = "LangRef.html#set";

  constructor(parent: Parent) {
    super(parent);
    this.assignable = new AssignableField(this);
    this.assignable.setPlaceholder("<i>variableName</i>");
    this.expr = new ExpressionField(this);
  }
  initialKeywords(): string {
    return setKeyword;
  }

  parseFrom(source: CodeSource): void {
    source.removeIndent();
    source.remove("set ");
    this.assignable.parseFrom(source);
    source.remove(" to ");
    this.expr.parseFrom(source);
    source.removeNewLine();
  }
  getFields(): Field[] {
    return [this.assignable, this.expr];
  }
  getIdPrefix(): string {
    return "set";
  }
  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}>${this.contextMenu()}${this.bpAsHtml()}<el-kw>${setKeyword} </el-kw>${this.assignable.renderAsHtml()}<el-kw> ${toKeyword} </el-kw>${this.expr.renderAsHtml()}${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-statement>`;
  }
  renderAsSource(): string {
    return `${this.indent()}${setKeyword} ${this.assignable.renderAsSource()} ${toKeyword} ${this.expr.renderAsSource()}`;
  }

  ids(transforms?: Transforms) {
    return getIds(this.assignable.getOrTransformAstNode(transforms));
  }

  symbolType(transforms?: Transforms) {
    const ids = this.ids(transforms);
    const st = this.expr.symbolType(transforms);
    return mapSymbolType(ids, st);
  }
}
