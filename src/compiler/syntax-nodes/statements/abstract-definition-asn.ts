import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { ElanSymbol } from "../../../compiler/compiler-interfaces/elan-symbol";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import {
  getDeconstructionIds,
  getGlobalScope,
  symbolMatches,
} from "../../../compiler/symbols/symbol-helpers";
import { SymbolScope } from "../../../compiler/symbols/symbol-scope";
import {
  getId,
  mustBeCompatibleDefinitionNode,
  mustNotBeKeyword,
  mustNotBeRedefined,
} from "../../compile-rules";
import { Definition } from "../../compiler-interfaces/definition";
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

  abstract isLocalConstant(): boolean;
  abstract isVariable(): boolean;

  getScope() {
    return this.compileScope ?? this.scope;
  }

  compile(): string {
    this.compileErrors = [];
    const id = getId(this.name);

    mustNotBeKeyword(id, this.compileErrors, this.fieldId);
    const symbol = this.getScope().resolveSymbol(id, this);
    mustNotBeRedefined(symbol, this.compileErrors, this.fieldId);

    const lhs = this.name;
    const rhs = this.expr;

    mustBeCompatibleDefinitionNode(rhs, this.isLocalConstant(), this.compileErrors, this.fieldId);

    const lhsCode = lhs.compile();

    const rhsCode = rhs.compile();

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${this.breakPoint(this.debugSymbols())}${this.indent()}${this.getJsKeyword()} ${lhsCode} = ${rhsCode};`;
  }

  get symbolId() {
    return getId(this.name);
  }

  symbolType() {
    const st = this.expr.symbolType();
    return st;
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
