import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { ElanSymbol } from "../../compiler/compiler-interfaces/elan-symbol";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { SymbolType } from "../../compiler/compiler-interfaces/symbol-type";
import { getGlobalScope, isDefinitionScope, match } from "../../compiler/symbols/symbol-helpers";
import { UnknownType } from "../../compiler/symbols/unknown-type";
import { SymbolScope } from "../symbols/symbol-scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { IdDefAsn } from "./id-def-asn";

export class LambdaSigAsn extends AbstractAstNode implements Scope, AstNode {
  constructor(
    public readonly parameters: IdDefAsn[],
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  private _pTypes: SymbolType[] = [];

  getParentScope(): Scope {
    return this.scope;
  }

  symbolType() {
    return UnknownType.Instance;
  }

  setParameterTypes(pTypes: SymbolType[]) {
    this._pTypes = pTypes;
  }

  parameterNamesAndTypes(): [string[], SymbolType[]] {
    const names = this.parameters.map((p) => p.id);
    const types = this._pTypes;
    return [names, types];
  }

  compile(): string {
    this.compileErrors = [];

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return this.parameters.map((p) => p.id).join(", ");
  }

  resolveSymbol(id: string, caseSensitive: boolean, initialScope: Scope): ElanSymbol {
    for (let i = 0; i < this.parameters.length; i++) {
      const p = this.parameters[i];
      if (match(p.id.trim(), id, caseSensitive)) {
        return {
          symbolId: id,
          symbolType: () => this._pTypes[i] ?? UnknownType.Instance,
          symbolScope: SymbolScope.parameter,
          symbolIsType: false,
        };
      }
    }

    const searchScope =
      isDefinitionScope(this.scope) || this.scope === initialScope
        ? this.scope.getParentScope()
        : this.scope;

    return searchScope.resolveSymbol(id, caseSensitive, this.scope);
  }

  symbolMatches(id: string, all: boolean, scope: Scope): ElanSymbol[] {
    const searchScope =
      isDefinitionScope(this.scope) || this.scope === scope
        ? this.scope.getParentScope()
        : this.scope;

    const matches = searchScope.symbolMatches(id, all, this.scope);
    const localMatches: ElanSymbol[] = [];

    for (let i = 0; i < this.parameters.length; i++) {
      const p = this.parameters[i];
      if (all || match(p.id.trim(), id, false)) {
        localMatches.push({
          symbolId: id,
          symbolType: () => this._pTypes[i] ?? UnknownType.Instance,
          symbolScope: SymbolScope.parameter,
          symbolIsType: false,
        });
      }
    }

    return localMatches.concat(matches);
  }

  toString() {
    const pp = this.parameters.map((p) => p.toString()).join(", ");

    return `${pp}`;
  }
}
