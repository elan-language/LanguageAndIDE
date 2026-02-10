import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { ElanSymbol } from "../../../compiler/compiler-interfaces/elan-symbol";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import {
  getGlobalScope,
  isGenericSymbolType,
  symbolMatches,
} from "../../../compiler/symbols/symbol-helpers";
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

    mustNotBeRedefined(symbol, this.compileErrors, this.fieldId);

    const iterType = this.iter.symbolType();
    mustBeIterable(iterType!, this.compileErrors, this.fieldId);

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${this.indent()}const _iter${this.fieldId} = [...${this.iter.compile()}];\r
${this.indent()}${this.breakPoint(this.debugSymbols())}for (const ${this.variable.compile()} of _iter${this.fieldId}) {\r
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

    return super.resolveSymbol(id, initialScope);
  }

  symbolMatches(id: string, all: boolean, initialScope: Scope): ElanSymbol[] {
    const matches = super.symbolMatches(id, all, initialScope);
    const v = getId(this.variable);

    const counter = {
      symbolId: v,
      symbolType: () => {
        const iterSt = this.iter.symbolType();
        return isGenericSymbolType(iterSt) ? iterSt.ofTypes[0] : UnknownType.Instance;
      },
      symbolScope: SymbolScope.counter,
    };

    return matches.concat(symbolMatches(id, all, [counter]));
  }
}
