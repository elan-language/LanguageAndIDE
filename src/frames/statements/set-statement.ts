import { AbstractFrame } from "../abstract-frame";
import { CodeSource } from "../code-source";
import {
  mustBeCompatibleNode,
  mustBeIndexableSymbol,
  mustBeRangeableSymbol,
  mustNotBeConstant,
  mustNotBeCounter,
  mustNotBeLet,
  mustNotBeParameter,
  mustNotBePropertyOnFunctionMethod,
  mustNotIndexOnFunctionMethod,
} from "../compile-rules";
import { AssignableField } from "../fields/assignableField";
import { ExpressionField } from "../fields/expression-field";
import { Field } from "../interfaces/field";
import { Parent } from "../interfaces/parent";
import { Statement } from "../interfaces/statement";
import { setKeyword, toKeyword } from "../keywords";
import { isDictionarySymbolType, isGenericSymbolType } from "../symbols/symbol-helpers";
import { isAstIdNode } from "../syntax-nodes/ast-helpers";
import { Transforms } from "../syntax-nodes/transforms";
import { VarAsn } from "../syntax-nodes/var-asn";

export class SetStatement extends AbstractFrame implements Statement {
  isStatement = true;
  assignable: AssignableField;
  expr: ExpressionField;

  constructor(parent: Parent) {
    super(parent);
    this.assignable = new AssignableField(this);
    this.assignable.setPlaceholder("variableName");
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
    return `<statement class="${this.cls()}" id='${this.htmlId}' tabindex="0"><keyword>${setKeyword} </keyword>${this.assignable.renderAsHtml()}<keyword> ${toKeyword} </keyword>${this.expr.renderAsHtml()}${this.compileMsgAsHtml()}</statement>`;
  }
  renderAsSource(): string {
    return `${this.indent()}${setKeyword} ${this.assignable.renderAsSource()} ${toKeyword} ${this.expr.renderAsSource()}`;
  }
  compile(transforms: Transforms): string {
    this.compileErrors = [];
    const assignableAstNode = this.assignable.getOrTransformAstNode(transforms);
    const exprAstNode = this.expr.getOrTransformAstNode(transforms);

    mustNotBePropertyOnFunctionMethod(
      assignableAstNode,
      this.getParent(),
      this.compileErrors,
      this.htmlId,
    );

    mustNotIndexOnFunctionMethod(
      assignableAstNode,
      this.getParent(),
      this.compileErrors,
      this.htmlId,
    );

    mustBeCompatibleNode(assignableAstNode, exprAstNode, this.compileErrors, this.htmlId);
    mustNotBeParameter(assignableAstNode, this.getParent(), this.compileErrors, this.htmlId);
    mustNotBeConstant(assignableAstNode, this.compileErrors, this.htmlId);
    mustNotBeCounter(assignableAstNode, this.compileErrors, this.htmlId);

    if (isAstIdNode(assignableAstNode)) {
      const symbol = this.getParent().resolveSymbol(assignableAstNode.id, transforms, this);
      mustNotBeLet(symbol, this.compileErrors, this.htmlId);
    }

    const assignable = this.assignable.getOrTransformAstNode(transforms);

    if (assignable instanceof VarAsn) {
      if (assignable.isIndex()) {
        let safeSet: string = "";
        const rootType = assignable.rootSymbolType();
        if (assignable.isDoubleIndex() && isGenericSymbolType(rootType)) {
          mustBeIndexableSymbol(rootType.ofType, false, this.compileErrors, this.htmlId);
          safeSet = "system.safeDoubleSet";
        } else if (assignable.isDoubleIndex() && isDictionarySymbolType(rootType)) {
          mustBeIndexableSymbol(rootType.valueType, false, this.compileErrors, this.htmlId);
          safeSet = "system.safeDoubleSet";
        } else {
          mustBeIndexableSymbol(rootType, false, this.compileErrors, this.htmlId);
          safeSet = "system.safeSet";
        }

        return `${this.indent()}${safeSet}(${this.assignable.compile(transforms)}, ${this.expr.compile(transforms)});`;
      }
      if (assignable.isRange()) {
        mustBeRangeableSymbol(assignable.symbolType(), false, this.compileErrors, this.htmlId);
      }
    }

    return `${this.indent()}${this.assignable.compile(transforms)} = ${this.expr.compile(transforms)};`;
  }
}
