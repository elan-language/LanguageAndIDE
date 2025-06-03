import { AbstractFrame } from "../abstract-frame";

import {
  mustBeCompatibleNode,
  mustBeDeconstructableType,
  mustNotBeConstant,
  mustNotBeCounter,
  mustNotBeLet,
  mustNotBeParameter,
  mustNotBePropertyOnFunctionMethod,
} from "../compile-rules";
import { AssignableField } from "../fields/assignableField";
import { ExpressionField } from "../fields/expression-field";
import { mapSymbolType } from "../frame-helpers";
import { CodeSource } from "../interfaces/code-source";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { Transforms } from "../interfaces/transforms";
import { setKeyword, toKeyword } from "../keywords";
import { getIds, wrapDeconstructionLhs, wrapDeconstructionRhs } from "../syntax-nodes/ast-helpers";

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
    return `<el-statement class="${this.cls()}" id='${this.htmlId}' tabindex="0" ${this.toolTip()}>${this.contextMenu()}${this.bpAsHtml()}<el-kw>${setKeyword} </el-kw>${this.helpAsHtml()}${this.assignable.renderAsHtml()}<el-kw> ${toKeyword} </el-kw>${this.expr.renderAsHtml()}${this.compileMsgAsHtml()}${this.getFrNo()}</el-statement>`;
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

  compile(transforms: Transforms): string {
    this.compileErrors = [];
    const assignableAstNode = this.assignable.getOrTransformAstNode(transforms);
    const exprAstNode = this.expr.getOrTransformAstNode(transforms);

    const ids = this.ids(transforms);

    if (ids.length > 1) {
      mustBeDeconstructableType(this.symbolType(transforms), this.compileErrors, this.htmlId);
    }

    mustNotBePropertyOnFunctionMethod(
      assignableAstNode,
      this.getParent(),
      this.compileErrors,
      this.htmlId,
    );

    mustBeCompatibleNode(
      assignableAstNode,
      exprAstNode,
      this.getParent(),
      this.compileErrors,
      this.htmlId,
    );
    mustNotBeParameter(assignableAstNode, this.getParent(), this.compileErrors, this.htmlId);
    mustNotBeConstant(assignableAstNode, this.compileErrors, this.htmlId);
    mustNotBeCounter(assignableAstNode, this.compileErrors, this.htmlId);

    for (const id of ids) {
      const symbol = this.getParent().resolveSymbol(id, transforms, this);
      mustNotBeLet(symbol, this.compileErrors, this.htmlId);
    }

    const lhs = wrapDeconstructionLhs(assignableAstNode, exprAstNode, true);

    const rhs = wrapDeconstructionRhs(assignableAstNode, exprAstNode, true);

    return `${this.indent()}${this.breakPoint(this.debugSymbols())}${lhs} = ${rhs};`;
  }
}
