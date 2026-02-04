import { AstIdNode } from "../../compiler/compiler-interfaces/ast-id-node";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { getGlobalScope, match, symbolMatches } from "../../compiler/symbols/symbol-helpers";
import { SymbolScope } from "../../compiler/symbols/symbol-scope";
import { mustBeKnownSymbolType, mustNotBeKeyword } from "../compile-rules";
import { ElanSymbol } from "../compiler-interfaces/elan-symbol";
import { UnknownSymbol } from "../symbols/unknown-symbol";
import { AbstractAstNode } from "./abstract-ast-node";

export class ParamDefAsn extends AbstractAstNode implements AstIdNode {
  constructor(
    public readonly id: string,
    private readonly type: AstIdNode,
    private readonly out: boolean,
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
    return `${this.out ? "out " : ""}${this.id} as ${this.type}`;
  }

  get symbolId() {
    return this.id;
  }

  get symbolScope() {
    return this.out ? SymbolScope.outParameter : SymbolScope.parameter;
  }

  resolveSymbol(id: string, caseSensitive: boolean, _initialScope: Scope): ElanSymbol {
    if (match(this.id.trim(), id, caseSensitive)) {
      return this;
    }
    return new UnknownSymbol(id);
  }

  symbolMatches(id: string, all: boolean, _scope: Scope): ElanSymbol[] {
    return symbolMatches(id, all, [this]);
  }
}
