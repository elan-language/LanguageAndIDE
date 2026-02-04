import { AstCollectionNode } from "../../compiler/compiler-interfaces/ast-collection-node";
import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { ReifyableSymbolType } from "../../compiler/compiler-interfaces/reifyable-symbol-type";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { ListName } from "../../compiler/symbols/elan-type-names";
import { getGlobalScope } from "../../compiler/symbols/symbol-helpers";
import { UnknownType } from "../../compiler/symbols/unknown-type";
import { mustBeAssignableType, mustBeImmutableCollection } from "../compile-rules";
import { AbstractAstNode } from "./abstract-ast-node";
import { isInsideConstant } from "./ast-helpers";

export class LiteralListAsn extends AbstractAstNode implements AstCollectionNode {
  constructor(
    public readonly items: AstNode[],
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  compile(): string {
    this.compileErrors = [];

    if (isInsideConstant(this.scope)) {
      mustBeImmutableCollection(true, this.compileErrors, this.fieldId);
    }

    const ofType = this.items[0]?.symbolType();

    for (const i of this.items) {
      mustBeAssignableType(ofType, i.symbolType(), this.compileErrors, this.fieldId);
    }

    const it = this.items.map((p) => p.compile()).join(", ");

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);
    return `system.list([${it}])`;
  }

  symbolType() {
    const globalScope = getGlobalScope(this.scope);
    const symbol = globalScope.resolveSymbol(ListName, true, this.scope);
    const st = symbol.symbolType() as ReifyableSymbolType;

    return st.reify([this.items[0]?.symbolType() ?? UnknownType.Instance]);
  }

  toString() {
    const it = this.items.map((p) => p.toString()).join(", ");
    return `[${it}]`;
  }
}
