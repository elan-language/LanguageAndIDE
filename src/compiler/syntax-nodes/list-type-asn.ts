import { AstNode } from "../compiler-interfaces/ast-node";
import { Scope } from "../compiler-interfaces/scope";
import { getGlobalScope } from "../symbols/symbol-helpers";
import { AbstractAstNode } from "./abstract-ast-node";

export class ListTypeAsn extends AbstractAstNode implements AstNode {
  constructor(
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  compile(): string {
    this.compileErrors = [];

    return "List";
  }

  symbolType() {
    const scope = getGlobalScope(this.scope);
    return scope.resolveSymbol("List", true, this.scope).symbolType();
  }

  toString() {
    return `${this.symbolType()}`;
  }
}
