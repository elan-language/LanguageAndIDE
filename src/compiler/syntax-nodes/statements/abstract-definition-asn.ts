import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { ElanSymbol } from "../../../compiler/compiler-interfaces/elan-symbol";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import {
  getDeconstructionIds,
  getGlobalScope,
  mapSymbolType,
  match,
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
import { Definition } from "../../compiler-interfaces/definition";
import { getIds, wrapDeconstructionLhs, wrapDeconstructionRhs } from "../ast-helpers";
import { BreakpointAsn } from "../breakpoint-asn";
import { EmptyAsn } from "../empty-asn";
import { DefinitionAdapter } from "./definition-adapter";

export abstract class AbstractDefinitionAsn extends BreakpointAsn implements Definition {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  name: AstNode = EmptyAsn.Instance;
  expr: AstNode = EmptyAsn.Instance;

  abstract getJsKeyword(): string;

  abstract isLet(): boolean;
  abstract isVariable(): boolean;

  getScope() {
    return this.compileScope ?? this.scope;
  }

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
      const symbol = this.getScope().resolveSymbol(i!, true, this);
      mustNotBeRedefined(symbol, i, this.compileErrors, this.fieldId);
    }

    const lhs = this.name;
    const rhs = this.expr;

    mustBeCompatibleDefinitionNode(lhs, rhs, this.getScope(), this.compileErrors, this.fieldId);

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

  resolveSymbol(id: string, caseSensitive: boolean, initialScope: Scope): ElanSymbol {
    if (match(id, this.symbolId, caseSensitive)) {
      return this;
    }

    return super.resolveSymbol(id, caseSensitive, initialScope);
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
