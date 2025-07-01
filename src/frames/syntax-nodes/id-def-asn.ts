import { mustNotBeKeyword } from "../compile-rules";
import { AstIdNode } from "../compiler-interfaces/ast-id-node";
import { Scope } from "../compiler-interfaces/scope";
import { getGlobalScope } from "../symbols/symbol-helpers";
import { AbstractAstNode } from "./abstract-ast-node";

export class IdDefAsn extends AbstractAstNode implements AstIdNode {
  constructor(
    public readonly id: string,
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  compile(): string {
    this.compileErrors = [];
    mustNotBeKeyword(this.id, this.compileErrors, this.fieldId);

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return this.id;
  }

  symbolType() {
    return this.scope.resolveSymbol(this.id, this.scope).symbolType();
  }

  toString() {
    return this.id;
  }
}
