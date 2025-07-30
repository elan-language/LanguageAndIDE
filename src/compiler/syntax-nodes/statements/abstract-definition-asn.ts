import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { ElanSymbol } from "../../../compiler/compiler-interfaces/elan-symbol";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import {
  getDeconstructionIds,
  getGlobalScope,
  mapSymbolType,
  symbolMatches,
} from "../../../compiler/symbols/symbol-helpers";
import { SymbolScope } from "../../../compiler/symbols/symbol-scope";
import {
  getId,
  mustBeCompatibleDefinitionNode,
  mustBeDeconstructableType,
  mustNotBeKeyword,
  mustNotBeRedefined,
} from "../../compile-rules";
import { getIds, wrapDeconstructionLhs, wrapDeconstructionRhs } from "../ast-helpers";
import { BreakpointAsn } from "../breakpoint-asn";
import { EmptyAsn } from "../empty-asn";
import { DefinitionAdapter } from "./definition-adapter";

export abstract class AbstractDefinitionAsn extends BreakpointAsn implements ElanSymbol {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  name: AstNode = EmptyAsn.Instance;
  expr: AstNode = EmptyAsn.Instance;

  abstract getJsKeyword(): string;

  ids() {
    return getIds(this.name);
  }

  compile(): string {
    this.compileErrors = [];
    const ids = this.ids();

    if (ids.length > 1) {
      mustBeDeconstructableType(this.symbolType(), this.compileErrors, this.fieldId);
    }

    for (const i of ids) {
      mustNotBeKeyword(i, this.compileErrors, this.fieldId);
      const symbol = this.scope.resolveSymbol(i!, this);
      mustNotBeRedefined(symbol, i, this.compileErrors, this.fieldId);
    }

    const lhs = this.name;
    const rhs = this.expr;

    mustBeCompatibleDefinitionNode(lhs, rhs, this.scope, this.compileErrors, this.fieldId);

    const lhsCode = wrapDeconstructionLhs(lhs, rhs, false);

    const rhsCode = wrapDeconstructionRhs(lhs, rhs, false);

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${this.breakPoint(this.debugSymbols())}${this.indent()}${this.getJsKeyword()} ${lhsCode} = ${rhsCode};`;
  }

  get symbolId() {
    return getId(this.name);
  }

  symbolType() {
    const ids = this.ids();
    const st = this.expr.symbolType();
    return mapSymbolType(ids, st);
  }

  get symbolScope() {
    return SymbolScope.local;
  }

  resolveSymbol(id: string, initialScope: Scope): ElanSymbol {
    if (id === this.symbolId) {
      return this;
    }

    return super.resolveSymbol(id, initialScope);
  }

  symbolMatches(id: string, all: boolean, initialScope: Scope): ElanSymbol[] {
    const matches = super.symbolMatches(id, all, initialScope);
    const ids = getDeconstructionIds(this.symbolId);

    const definitions =
      ids.length > 1 ? ids.map((_, i) => new DefinitionAdapter(this, i)) : [this as ElanSymbol];

    const localMatches = symbolMatches(id, all, definitions);

    return localMatches.concat(matches);
  }
}
