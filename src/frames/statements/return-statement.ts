import { AbstractFrame } from "../abstract-frame";

import { ExpressionField } from "../fields/expression-field";
import { CodeSource } from "../interfaces/code-source";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { Transforms } from "../interfaces/transforms";
import { returnKeyword } from "../keywords";

export class ReturnStatement extends AbstractFrame implements Statement {
  isStatement = true;
  isReturnStatement = true;
  expr: ExpressionField;
  constructor(parent: Parent) {
    super(parent);
    this.movable = false;
    this.expr = new ExpressionField(this);
  }
  initialKeywords(): string {
    return returnKeyword;
  }

  delete(): void {} //Does nothing as return cannot be deleted

  getFields(): Field[] {
    return [this.expr];
  }

  getIdPrefix(): string {
    return "return";
  }
  renderAsHtml(): string {
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}>${this.contextMenu()}${this.bpAsHtml()}<el-kw>return </el-kw>${this.expr.renderAsHtml()}${this.helpAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-statement>`;
  }

  renderAsSource(): string {
    return `${this.indent()}return ${this.expr.renderAsSource()}`;
  }

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    return `${this.indent()}${this.breakPoint(this.debugSymbols())}return ${this.expr.compile(transforms)};`;
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
