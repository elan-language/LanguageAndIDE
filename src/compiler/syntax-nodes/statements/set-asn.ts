import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { getGlobalScope } from "../../../compiler/symbols/symbol-helpers";
import {
  getId,
  mustBeCompatibleNode,
  mustNotBeConstant,
  mustNotBeCopyOfThis,
  mustNotBeCounter,
  mustNotBeLet,
  mustNotBeParameter,
  mustNotBePropertyOnFunctionMethod,
  mustNotSetIndexInFunctionMethod,
  mustNotSetRangedIndex,
} from "../../compile-rules";
import { BreakpointAsn } from "../breakpoint-asn";
import { EmptyAsn } from "../empty-asn";
import { VarAsn } from "../var-asn";

export class SetAsn extends BreakpointAsn {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  assignable: AstNode = EmptyAsn.Instance;
  expr: AstNode = EmptyAsn.Instance;

  symbolType() {
    const st = this.expr.symbolType();
    return st;
  }

  compile(): string {
    this.compileErrors = [];
    const assignableAstNode = this.assignable;
    const exprAstNode = this.expr;

    const id = getId(this.assignable);

    mustNotBePropertyOnFunctionMethod(assignableAstNode, this, this.compileErrors, this.fieldId);

    mustBeCompatibleNode(assignableAstNode, exprAstNode, this.compileErrors, this.fieldId);
    mustNotBeParameter(assignableAstNode, this.getParentScope(), this.compileErrors, this.fieldId);
    mustNotBeConstant(assignableAstNode, this.compileErrors, this.fieldId);
    mustNotBeCounter(assignableAstNode, this.compileErrors, this.fieldId);
    mustNotBeCopyOfThis(assignableAstNode, this.compileErrors, this.fieldId);

    const symbol = this.getParentScope().resolveSymbol(id, this);
    mustNotBeLet(symbol, this.compileErrors, this.fieldId);

    if (this.assignable instanceof VarAsn) {
      if (this.assignable.isSimpleSubscript()) {
        mustNotSetIndexInFunctionMethod(this.scope, this.compileErrors, this.fieldId);

        this.assignable.setRHS(exprAstNode.compile());
        const code = this.assignable.compile();
        getGlobalScope(this.scope).addCompileErrors(this.compileErrors);
        return `${this.indent()}${this.breakPoint(this.debugSymbols())}${code};`;
      }
      if (this.assignable.isRangeSubscript()) {
        mustNotSetRangedIndex(this.compileErrors, this.fieldId);
      }
    }

    const lhs = assignableAstNode.compile();

    const rhs = exprAstNode.compile();

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${this.indent()}${this.breakPoint(this.debugSymbols())}${lhs} = ${rhs};`;
  }
}
