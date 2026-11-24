import { mustBeInsideClass } from "../compile-rules";
import { AstNode } from "../compiler-interfaces/ast-node";
import { Scope } from "../compiler-interfaces/scope";
import { getGlobalScope, isInsideClass } from "../symbols/symbol-helpers";
import { thisWellKnownId } from "../well-known-ids";
import { AbstractAstNode } from "./abstract-ast-node";

export class ThisInstanceAsn extends AbstractAstNode implements AstNode {
  constructor(
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  compile(): string {
    this.compileErrors = [];

    if (!isInsideClass(this.scope)) {
      mustBeInsideClass(this.scope, this.compileErrors, this.fieldId);
    }

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return "this";
  }

  symbolType() {
    return this.scope.resolveSymbol(thisWellKnownId, true, this.scope)?.symbolType();
  }

  toString() {
    return "this";
  }
}
