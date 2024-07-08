import { ExpressionField } from "../fields/expression-field";
import { Parent } from "../interfaces/parent";
import { Field } from "../interfaces/field";
import { CodeSource } from "../code-source";
import { AbstractFrame } from "../abstract-frame";
import { Statement } from "../interfaces/statement";
import { setKeyword, toKeyword } from "../keywords";
import { AssignableField } from "../fields/assignableField";
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
import { AstNode } from "../interfaces/ast-node";
import { Transforms } from "../syntax-nodes/transforms";
import { AstQualifiedNode } from "../interfaces/ast-qualified-node";
import { VarAsn } from "../syntax-nodes/var-asn";
import { isDictionarySymbolType, isGenericSymbolType } from "../symbols/symbol-helpers";
import { AstIdNode } from "../interfaces/ast-id-node";

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
    const assignableAstNode = this.assignable.getOrTransformAstNode(
      transforms,
    )! as AstIdNode;
    const exprAstNode = this.expr.getOrTransformAstNode(transforms)!;

    mustNotBePropertyOnFunctionMethod(
      assignableAstNode,
      this.getParent(),
      this.compileErrors,
      this.assignable.getHtmlId(),
    );

    mustNotIndexOnFunctionMethod(
      assignableAstNode,
      this.getParent(),
      this.compileErrors,
      this.assignable.getHtmlId(),
    );

    mustBeCompatibleNode(assignableAstNode, exprAstNode, this.compileErrors, this.expr.getHtmlId());
    mustNotBeParameter(
      assignableAstNode,
      this.getParent(),
      this.compileErrors,
      this.assignable.getHtmlId(),
    );
    mustNotBeConstant(assignableAstNode, this.compileErrors, this.assignable.getHtmlId());
    mustNotBeCounter(assignableAstNode, this.compileErrors, this.assignable.getHtmlId());

    const symbol = this.getParent().resolveSymbol(assignableAstNode.id, transforms, this);
    mustNotBeLet(symbol, this.compileErrors, this.assignable.getHtmlId());

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
