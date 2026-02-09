import { AstIdNode } from "../../compiler/compiler-interfaces/ast-id-node";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { getGlobalScope, symbolMatches } from "../../compiler/symbols/symbol-helpers";
import { SymbolScope } from "../../compiler/symbols/symbol-scope";
import { mustBeKnownSymbolType, mustNotBeKeyword } from "../compile-rules";
import { ElanSymbol } from "../compiler-interfaces/elan-symbol";
import { UnknownSymbol } from "../symbols/unknown-symbol";
import { AbstractAstNode } from "./abstract-ast-node";

export class ParamDefAsn extends AbstractAstNode implements AstIdNode {
  constructor(
    public readonly id: string,
    private readonly type: AstIdNode,
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  compile(): string {
    this.compileErrors = [];

    // compile type to catch any errors
    this.type.compile();

    mustNotBeKeyword(this.id, this.compileErrors, this.fieldId);
    mustBeKnownSymbolType(this.symbolType(), this.type.id, this.compileErrors, this.fieldId);
    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);
    return `${this.id}`;
  }

  symbolType() {
    return this.type.symbolType();
  }

  toString() {
    return `${this.id} as ${this.type}`;
  }

  get symbolId() {
    return this.id;
  }

  get symbolScope() {
    return SymbolScope.parameter;
  }

  resolveSymbol(id: string, _scope: Scope): ElanSymbol {
    if (this.id.trim() === id) {
      return this;
    }
    return new UnknownSymbol(id);
  }

  symbolMatches(id: string, all: boolean, _scope: Scope): ElanSymbol[] {
    return symbolMatches(id, all, [this]);
  }
}
