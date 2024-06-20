import { getParentScope } from "../symbols/symbol-helpers";
import { CompileError } from "../compile-error";
import { mustBeKnownSymbol, mustNotBeKeyword } from "../compile-rules";
import { isMember } from "../helpers";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { transforms } from "./ast-helpers";
import { AstIdNode } from "../interfaces/ast-id-node";
import { SymbolScope } from "../symbols/symbol-scope";
import { LetStatement } from "../statements/let-statement";
import { DeconstructedTupleType } from "../symbols/deconstructed-tuple-type";

export class IdAsn extends AbstractAstNode implements AstIdNode {
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

    mustNotBeKeyword(this.id, this.compileErrors, this.fieldId);

    if (isMember(this.scope)) {
      // don't prefix properties with this
      return this.id;
    }
    const symbol = getParentScope(this.scope).resolveSymbol(this.id, transforms(), this.scope);

    if (symbol instanceof LetStatement) {
      return `${this.id}()`;
    }
    if (symbol.symbolScope === SymbolScope.stdlib) {
      return `_stdlib.${this.id}`;
    }
    if (symbol.symbolScope === SymbolScope.property) {
      return `this.${this.id}`;
    }

    mustBeKnownSymbol(symbol, this.compileErrors, this.fieldId);

    return this.id;
  }

  symbolType() {
    const st = getParentScope(this.scope)
      .resolveSymbol(this.id, transforms(), this.scope)
      .symbolType(transforms());

    if (st instanceof DeconstructedTupleType) {
      return st.symbolTypeFor(this.id);
    }
    return st;
  }

  toString() {
    return this.id;
  }
}
