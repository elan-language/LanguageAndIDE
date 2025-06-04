import {
  mustNotBeRedefined,
  mustNotBeOutParameter,
  mustBeUniqueNameInScope,
} from "../../compile-rules";
import { AstIdNode } from "../../interfaces/ast-id-node";
import { AstNode } from "../../interfaces/ast-node";
import { ElanSymbol } from "../../interfaces/elan-symbol";
import { Scope } from "../../interfaces/scope";
import { SymbolType } from "../../interfaces/symbol-type";
import { Transforms } from "../../interfaces/transforms";
import { DuplicateSymbol } from "../../symbols/duplicate-symbol";
import { getGlobalScope, isFunction, symbolMatches } from "../../symbols/symbol-helpers";
import { SymbolScope } from "../../symbols/symbol-scope";
import { UnknownSymbol } from "../../symbols/unknown-symbol";
import { AbstractAstNode } from "../abstract-ast-node";
import { isAstCollectionNode, isAstIdNode, isConstructor, transforms } from "../ast-helpers";
import { EmptyAsn } from "../empty-asn";

export class ParamListAsn extends AbstractAstNode implements Scope, AstNode {
  constructor(
    readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }
  symbolType(): SymbolType {
    throw new Error("Method not implemented.");
  }

  parms: AstNode = EmptyAsn.Instance;

  getParentScope(): Scope {
    return this.scope;
  }

  private getParamsAsSymbols(): ElanSymbol[] {
    const ast = this.parms;

    if (isAstCollectionNode(ast)) {
      return ast.items
        .filter((n) => isAstIdNode(n))
        .map((n) => ({
          symbolId: n.id,
          symbolType: () => n.symbolType(),
          symbolScope: n.symbolScope,
        }));
    }

    return [];
  }

  symbolMatches(id: string, all: boolean, _initialScope: Scope): ElanSymbol[] {
    const symbols = this.getParamsAsSymbols();
    return symbolMatches(id, all, symbols);
  }

  symbolNamesAndTypes(): [string[], SymbolType[]] {
    const symbols = this.getParamsAsSymbols();
    const names = symbols.map((s) => s.symbolId);
    const types = symbols.map((s) => s.symbolType());
    return [names, types];
  }

  resolveSymbol(id: string, _transforms: Transforms, _initialScope: Scope): ElanSymbol {
    const allSymbols = this.getParamsAsSymbols();
    const matches = allSymbols.filter((n) => n.symbolId === id);

    if (matches.length === 1) {
      return matches[0];
    }

    if (matches.length > 1) {
      return new DuplicateSymbol(matches);
    }

    return new UnknownSymbol(id);
  }

  private mustNotBeRedefined(id: string, transforms: Transforms) {
    // up two or we just get the parameter again
    const symbol = this.getParentScope().getParentScope().resolveSymbol(id, transforms, this);
    mustNotBeRedefined(symbol, this.compileErrors, this.fieldId);
  }

  private mustNotBeOutOnFunctionOrConstructor(id: string, transforms: Transforms) {
    // up two or we just get the parameter again
    const parentScope = this.getParentScope();

    if (isFunction(parentScope as unknown as ElanSymbol) || isConstructor(parentScope)) {
      const symbol = parentScope.resolveSymbol(id, transforms, this);
      if (symbol.symbolScope === SymbolScope.outParameter) {
        mustNotBeOutParameter(this.compileErrors, this.fieldId);
      }
    }
  }

  private getIdNodes(parms: AstNode): AstIdNode[] {
    if (isAstCollectionNode(parms)) {
      return parms.items.filter((n) => isAstIdNode(n)) as AstIdNode[];
    }

    return [];
  }

  compile(): string {
    this.compileErrors = [];

    const parms = this.parms;

    const idNodes = this.getIdNodes(parms);

    for (const idNode of idNodes) {
      this.mustNotBeOutOnFunctionOrConstructor(idNode.id, transforms());

      if (idNodes.length > 1) {
        mustBeUniqueNameInScope(idNode.id, this, transforms(), this.compileErrors, this.fieldId);
      }

      this.mustNotBeRedefined(idNode.id, transforms());

      getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

      return parms.compile();
    }

    return "";
  }
}
