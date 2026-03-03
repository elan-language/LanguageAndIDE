import { AstIdNode } from "../../compiler/compiler-interfaces/ast-id-node";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { getGlobalScope } from "../../compiler/symbols/symbol-helpers";
import { mustNotBeKeyword } from "../compile-rules";
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
    return this.scope.resolveSymbol(this.id, true, this.scope).symbolType();
  }

  toString() {
    return this.id;
  }
}
