import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { ElanSymbol } from "../../../compiler/compiler-interfaces/elan-symbol";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { getGlobalScope, isGenericSymbolType } from "../../../compiler/symbols/symbol-helpers";
import { SymbolScope } from "../../../compiler/symbols/symbol-scope";
import { UnknownType } from "../../../compiler/symbols/unknown-type";
import { getId, mustBeIterable, mustNotBeRedefined } from "../../compile-rules";
import { CompoundAsn } from "../compound-asn";
import { EmptyAsn } from "../empty-asn";

export class EachAsn extends CompoundAsn {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  variable: AstNode = EmptyAsn.Instance;
  iter: AstNode = EmptyAsn.Instance;

  compile(): string {
    this.compileErrors = [];

    const id = this.variable.compile();
    const symbol = this.scope.resolveSymbol(id, this);

    mustNotBeRedefined(symbol, id, this.compileErrors, this.fieldId);

    const iterType = this.iter.symbolType();
    mustBeIterable(iterType!, this.compileErrors, this.fieldId);

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${this.indent()}${this.breakPoint(this.debugSymbols())}for (const ${this.variable.compile()} of ${this.iter.compile()}) {\r
${this.compileChildren()}\r
${this.indent()}}`;
  }

  resolveSymbol(id: string, initialScope: Scope): ElanSymbol {
    const v = getId(this.variable);

    if (id === v) {
      const iterSt = this.iter.symbolType();
      const st = isGenericSymbolType(iterSt) ? iterSt.ofTypes[0] : UnknownType.Instance;
      return {
        symbolId: id,
        symbolType: () => st,
        symbolScope: SymbolScope.counter,
      };
    }

    const iter = getId(this.iter);

    if (id === iter) {
      // intercept iter resolve in order to make counter so it's immutable
      const symbol = super.resolveSymbol(id, this);
      return {
        symbolId: id,
        symbolType: () => symbol.symbolType(),
        symbolScope: SymbolScope.counter,
      };
    }

    return super.resolveSymbol(id, initialScope);
  }

  symbolMatches(id: string, all: boolean, _initialScope: Scope): ElanSymbol[] {
    const matches = super.symbolMatches(id, all, this);
    const localMatches: ElanSymbol[] = [];

    const v = getId(this.variable);

    if (id === v || all) {
      const iterSt = this.iter.symbolType();
      const st = isGenericSymbolType(iterSt) ? iterSt.ofTypes[0] : UnknownType.Instance;
      const counter = {
        symbolId: v,
        symbolType: () => st,
        symbolScope: SymbolScope.counter,
      };
      localMatches.push(counter);
    }

    return localMatches.concat(matches);
  }
}
