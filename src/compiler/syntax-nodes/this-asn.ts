import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { getGlobalScope, isInsideClass } from "../../compiler/symbols/symbol-helpers";
import { mustBeInsideClass } from "../compile-rules";
import { thisKeyword } from "../elan-keywords";
import { AbstractAstNode } from "./abstract-ast-node";

export class ThisAsn extends AbstractAstNode implements AstNode {
  constructor(
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  compile(): string {
    this.compileErrors = [];

    if (!isInsideClass(this.scope)) {
      mustBeInsideClass(this.compileErrors, this.fieldId);
    }

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return "this";
  }

  symbolType() {
    return this.scope.resolveSymbol(thisKeyword, true, this.scope)?.symbolType();
  }

  toString() {
    return "this";
  }
}
