import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { ElanSymbol } from "../../compiler/compiler-interfaces/elan-symbol";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { SymbolType } from "../../compiler/compiler-interfaces/symbol-type";
import { getGlobalScope, isDefinitionScope } from "../../compiler/symbols/symbol-helpers";
import { SymbolScope } from "../../compiler/symbols/symbol-scope";
import { UnknownType } from "../../compiler/symbols/unknown-type";
import { mustNotBeOutParameter } from "../compile-rules";
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

  symbolMatches(_id: string, _all: boolean): ElanSymbol[] {
    return [];
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

  resolveSymbol(id: string, scope: Scope): ElanSymbol {
    for (const p of this.parameters) {
      if (p.id.trim() === id) {
        return {
          symbolId: id,
          symbolType: () => p.symbolType(),
          symbolScope: SymbolScope.local,
        };
      }
    }
    const searchScope =
      isDefinitionScope(this.scope) || this.scope === scope
        ? this.scope.getParentScope()
        : this.scope;

    return searchScope.resolveSymbol(id, this.scope);
  }

  toString() {
    const pp = this.parameters.map((p) => p.toString()).join(", ");

    return `${pp}`;
  }
}
