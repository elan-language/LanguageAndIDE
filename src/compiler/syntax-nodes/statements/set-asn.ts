import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { getGlobalScope, mapSymbolType } from "../../../compiler/symbols/symbol-helpers";
import {
  mustBeCompatibleNode,
  mustBeDeconstructableType,
  mustNotBeConstant,
  mustNotBeCounter,
  mustNotBeLet,
  mustNotBeParameter,
  mustNotBePropertyOnFunctionMethod,
} from "../../compile-rules";
import { getIds, wrapDeconstructionLhs, wrapDeconstructionRhs } from "../ast-helpers";
import { CompoundAsn } from "../compound-asn";
import { EmptyAsn } from "../empty-asn";

export class SetAsn extends CompoundAsn {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  assignable: AstNode = EmptyAsn.Instance;
  expr: AstNode = EmptyAsn.Instance;

  ids() {
    return getIds(this.assignable);
  }

  symbolType() {
    const ids = this.ids();
    const st = this.expr.symbolType();
    return mapSymbolType(ids, st);
  }

  compile(): string {
    this.compileErrors = [];
    const assignableAstNode = this.assignable;
    const exprAstNode = this.expr;

    const ids = this.ids();

    if (ids.length > 1) {
      mustBeDeconstructableType(this.symbolType(), this.compileErrors, this.fieldId);
    }

    mustNotBePropertyOnFunctionMethod(
      assignableAstNode,
      this.scope,
      this.compileErrors,
      this.fieldId,
    );

    mustBeCompatibleNode(
      assignableAstNode,
      exprAstNode,
      this.getParentScope(),
      this.compileErrors,
      this.fieldId,
    );
    mustNotBeParameter(assignableAstNode, this.getParentScope(), this.compileErrors, this.fieldId);
    mustNotBeConstant(assignableAstNode, this.compileErrors, this.fieldId);
    mustNotBeCounter(assignableAstNode, this.compileErrors, this.fieldId);

    for (const id of ids) {
      const symbol = this.getParentScope().resolveSymbol(id, this);
      mustNotBeLet(symbol, id, this.compileErrors, this.fieldId);
    }

    const lhs = wrapDeconstructionLhs(assignableAstNode, exprAstNode, true);

    const rhs = wrapDeconstructionRhs(assignableAstNode, exprAstNode, true);

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${this.indent()}${this.breakPoint(this.debugSymbols())}${lhs} = ${rhs};`;
  }
}
