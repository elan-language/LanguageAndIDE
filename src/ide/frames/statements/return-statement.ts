import { returnKeyword } from "../../../compiler/keywords";
import { AbstractFrame } from "../abstract-frame";
import { ExpressionField } from "../fields/expression-field";
import { CodeSource } from "../frame-interfaces/code-source";
import { Field } from "../frame-interfaces/field";
import { Parent } from "../frame-interfaces/parent";
import { Statement } from "../frame-interfaces/statement";

export class ReturnStatement extends AbstractFrame implements Statement {
  isStatement = true;
  isReturnStatement = true;
  expr: ExpressionField;
  constructor(parent: Parent) {
    super(parent);
    this._movable = false;
    this._ghostable = false;
    this.expr = new ExpressionField(this);
  }
  initialKeywords(): string {
    return returnKeyword;
  }

  override deleteIfPermissible(): void {} //Does nothing: return cannot be deleted

  getFields(): Field[] {
    return [this.expr];
  }

  getIdPrefix(): string {
    return "return";
  }
  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="-1" ${this.toolTip()}>${this.contextMenu()}${this.bpAsHtml()}<el-kw>return </el-kw>${this.expr.renderAsHtml()}${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}return ${this.expr.renderAsSource()}`;
  }

  parseFrom(source: CodeSource): void {
    source.removeIndent();
    source.remove("return ");
    this.expr.parseFrom(source);
  }

  canInsertAfter(): boolean {
    return false;
  }
}
