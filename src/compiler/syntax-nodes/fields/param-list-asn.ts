import { AstIdNode } from "../../../compiler/compiler-interfaces/ast-id-node";
import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { ElanSymbol } from "../../../compiler/compiler-interfaces/elan-symbol";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { SymbolType } from "../../../compiler/compiler-interfaces/symbol-type";
import { DuplicateSymbol } from "../../../compiler/symbols/duplicate-symbol";
import { getGlobalScope, match, symbolMatches } from "../../../compiler/symbols/symbol-helpers";
import { UnknownSymbol } from "../../../compiler/symbols/unknown-symbol";
import {
  mustBeUniqueNameInScope,
  mustNotBeRedefined,
  mustNotBeSameAsMethodName,
} from "../../compile-rules";
import { AbstractAstNode } from "../abstract-ast-node";
import { isAstIdNode } from "../ast-helpers";

export class ParamListAsn extends AbstractAstNode implements Scope, AstNode {
  constructor(
    private readonly paramDefs: AstNode[],
    readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }
  symbolType(): SymbolType {
    throw new Error("Method not implemented.");
  }

  getParentScope(): Scope {
    return this.scope;
  }

  private getParamsAsSymbols(): ElanSymbol[] {
    return this.paramDefs
      .filter((n) => isAstIdNode(n))
      .map((n) => ({
        symbolId: n.id,
        symbolType: () => n.symbolType(),
        symbolScope: n.symbolScope,
        symbolIsType: false,
      }));
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

  resolveSymbol(id: string, caseSensitive: boolean, _initialScope: Scope): ElanSymbol {
    const allSymbols = this.getParamsAsSymbols();
    const matches = allSymbols.filter((n) => match(n.symbolId, id, caseSensitive));

    if (matches.length === 1) {
      return matches[0];
    }

    if (matches.length > 1) {
      return new DuplicateSymbol(matches);
    }

    return new UnknownSymbol(id);
  }

  private mustNotBeRedefined(id: string) {
    // up two or we just get the parameter again
    const symbol = this.getParentScope().getParentScope().resolveSymbol(id, true, this);
    const caseInsensitiveSymbol = this.getParentScope()
      .getParentScope()
      .resolveSymbol(id, false, this);
    mustNotBeRedefined(caseInsensitiveSymbol, symbol, this.compileErrors, this.fieldId);
  }

  private getIdNodes(parms: AstNode[]): AstIdNode[] {
    return parms.filter((n) => isAstIdNode(n));
  }

  compile(): string {
    this.compileErrors = [];

    const parms = this.paramDefs;

    const idNodes = this.getIdNodes(parms);

    for (const idNode of idNodes) {
      mustNotBeSameAsMethodName(idNode.id, this.scope, this.compileErrors, this.fieldId);

      if (idNodes.length > 1) {
        mustBeUniqueNameInScope(idNode.id, this, this.compileErrors, this.fieldId);
      }

      this.mustNotBeRedefined(idNode.id);

      getGlobalScope(this.scope).addCompileErrors(this.compileErrors);
    }

    return parms.map((p) => p.compile()).join(", ");
  }
}
