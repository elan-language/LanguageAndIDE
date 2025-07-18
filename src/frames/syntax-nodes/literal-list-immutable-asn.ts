import { mustBeAssignableType, mustBeImmutableGenericType } from "../compile-rules";
import { AstCollectionNode } from "../compiler-interfaces/ast-collection-node";
import { AstNode } from "../compiler-interfaces/ast-node";
import { ReifyableSymbolType } from "../compiler-interfaces/reifyable-symbol-type";
import { Scope } from "../compiler-interfaces/scope";
import { ListImmutableName } from "../symbols/elan-type-names";
import { getGlobalScope } from "../symbols/symbol-helpers";
import { UnknownType } from "../symbols/unknown-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class LiteralListImmutableAsn extends AbstractAstNode implements AstCollectionNode {
  constructor(
    public readonly items: AstNode[],
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  compile(): string {
    this.compileErrors = [];
    const ofType = this.items[0]?.symbolType();

    for (const i of this.items) {
      mustBeAssignableType(ofType, i.symbolType(), this.compileErrors, this.fieldId);
    }

    mustBeImmutableGenericType(this.symbolType(), ofType, this.compileErrors, this.fieldId);

    const it = this.items.map((p) => p.compile()).join(", ");

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);
    return `system.listImmutable([${it}])`;
  }

  symbolType() {
    const globalScope = getGlobalScope(this.scope);
    const symbol = globalScope.resolveSymbol(ListImmutableName, this.scope);
    const st = symbol.symbolType() as ReifyableSymbolType;

    return st.reify([this.items[0]?.symbolType() ?? UnknownType.Instance]);
  }

  toString() {
    const it = this.items.map((p) => p.toString()).join(", ");
    return `{${it}}`;
  }
}
