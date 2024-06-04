import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { transforms } from "./ast-helpers";
import { AstIdNode } from "../interfaces/ast-id-node";
import { getParentScope } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { isMember } from "../helpers";

export class IdDefAsn extends AbstractAstNode implements AstIdNode {
  constructor(
    public readonly id: string,
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
    this.id = id.trim();
  }

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors;
  }

  compile(): string {
    this.compileErrors = [];

    if (isMember(this.scope)) {
      // don't prefix properties with this
      return this.id;
    }


    const symbol = getParentScope(this.scope).resolveSymbol(
      this.id,
      transforms(),
      this.scope,
    );

    if (symbol.symbolScope === SymbolScope.property) {
      return `this.${this.id}`;
    }

    return this.id;
  }

  symbolType() {
    return this.scope
      .resolveSymbol(this.id, transforms(), this.scope)
      .symbolType(transforms());
  }

  toString() {
    return this.id;
  }
}
