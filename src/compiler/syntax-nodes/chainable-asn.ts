import { AstNode } from "../compiler-interfaces/ast-node";
import { Scope } from "../compiler-interfaces/scope";
import { getGlobalScope } from "../symbols/symbol-helpers";
import { AbstractAstNode } from "./abstract-ast-node";

export class ChainableAsn extends AbstractAstNode {
  constructor(
    public readonly idOrMethodCall: AstNode,
    public readonly indices: AstNode[],
    public readonly fieldId: string,
    public readonly scope: Scope,
  ) {
    super();
  }

  compile(): string {
    this.compileErrors = [];

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${this.idOrMethodCall.compile()}`;
  }

  symbolType() {
    return this.scope.resolveSymbol("", true, this.scope).symbolType();
  }

  toString() {
    return "";
  }
}
