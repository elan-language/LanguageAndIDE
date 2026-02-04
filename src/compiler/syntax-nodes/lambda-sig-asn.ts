import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { ElanSymbol } from "../../compiler/compiler-interfaces/elan-symbol";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { SymbolType } from "../../compiler/compiler-interfaces/symbol-type";
import { getGlobalScope, isDefinitionScope } from "../../compiler/symbols/symbol-helpers";
import { SymbolScope } from "../../compiler/symbols/symbol-scope";
import { UnknownType } from "../../compiler/symbols/unknown-type";
import { mustNotBeOutParameter } from "../compile-rules";
import { UnknownSymbol } from "../symbols/unknown-symbol";
import { AbstractAstNode } from "./abstract-ast-node";
import { ParamDefAsn } from "./param-def-asn";

export class LambdaSigAsn extends AbstractAstNode implements Scope, AstNode {
  constructor(
    private readonly parameters: ParamDefAsn[],
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  getParentScope(): Scope {
    return this.scope;
  }

  symbolType() {
    return UnknownType.Instance;
  }

  parameterNamesAndTypes(): [string[], SymbolType[]] {
    const names = this.parameters.map((p) => p.id);
    const types = this.parameters.map((p) => p.symbolType());
    return [names, types];
  }

  compile(): string {
    this.compileErrors = [];

    for (const p of this.parameters) {
      if (p.symbolScope === SymbolScope.outParameter) {
        mustNotBeOutParameter(this.compileErrors, this.fieldId);
      }
    }

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return this.parameters.map((p) => p.compile()).join(", ");
  }

  resolveSymbol(id: string, caseSensitive: boolean, initialScope: Scope): ElanSymbol {
    for (const p of this.parameters) {
      const ss = p.resolveSymbol(id, caseSensitive, initialScope);
      if (!(ss instanceof UnknownSymbol)) {
        return ss;
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
    let localMatches: ElanSymbol[] = [];

    for (const p of this.parameters) {
      localMatches = localMatches.concat(p.symbolMatches(id, all, this));
    }

    return localMatches.concat(matches);
  }

  toString() {
    const pp = this.parameters.map((p) => p.toString()).join(", ");

    return `${pp}`;
  }
}
