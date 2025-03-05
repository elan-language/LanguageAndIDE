import { CompileError } from "../compile-error";
import { mustBeAssignableType } from "../compile-rules";
import { AstCollectionNode } from "../interfaces/ast-collection-node";
import { AstNode } from "../interfaces/ast-node";
import { ReifyableSymbolType } from "../interfaces/reifyable-symbol-type";
import { Scope } from "../interfaces/scope";
import { getGlobalScope } from "../symbols/symbol-helpers";
import { UnknownType } from "../symbols/unknown-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { transforms } from "./ast-helpers";

export class LiteralListAsn extends AbstractAstNode implements AstCollectionNode {
  constructor(
    public readonly items: AstNode[],
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    let cc: CompileError[] = [];
    for (const i of this.items) {
      cc = cc.concat(i.aggregateCompileErrors());
    }
    return this.compileErrors.concat(cc);
  }

  compile(): string {
    this.compileErrors = [];
    const ofType = this.items[0]?.symbolType();

    for (const i of this.items) {
      mustBeAssignableType(ofType, i.symbolType(), this.compileErrors, this.fieldId);
    }

    const it = this.items.map((p) => p.compile()).join(", ");
    return `system.list([${it}])`;
  }

  symbolType() {
    const globalScope = getGlobalScope(this.scope);
    const symbol = globalScope.resolveSymbol("List", transforms(), this.scope);
    const st = symbol.symbolType() as ReifyableSymbolType;

    return st.reify([this.items[0]?.symbolType() ?? UnknownType.Instance]);
  }

  toString() {
    const it = this.items.map((p) => p.toString()).join(", ");
    return `{${it}}`;
  }
}
