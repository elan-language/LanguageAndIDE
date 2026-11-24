import { getId, mustBeIterable, mustNotBeRedefined } from "../../compile-rules";
import { AstNode } from "../../compiler-interfaces/ast-node";
import { ElanSymbol } from "../../compiler-interfaces/elan-symbol";
import { Scope } from "../../compiler-interfaces/scope";
import {
  getGlobalScope,
  isGenericSymbolType,
  match,
  symbolMatches,
} from "../../symbols/symbol-helpers";
import { SymbolScope } from "../../symbols/symbol-scope";
import { UnknownType } from "../../symbols/unknown-type";
import { CompoundAsn } from "../compound-asn";
import { EmptyAsn } from "../empty-asn";

export class ForLoopAsn extends CompoundAsn {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  identifierDef: AstNode = EmptyAsn.Instance;
  expression: AstNode = EmptyAsn.Instance;

  compile(): string {
    this.compileErrors = [];

    const id = this.identifierDef.compile();
    const symbol = this.scope.resolveSymbol(id, true, this);
    const caseInsensitiveSymbol = this.scope.resolveSymbol(id, false, this);
    mustNotBeRedefined(caseInsensitiveSymbol, symbol, this.compileErrors, this.fieldId);

    const iterType = this.expression.symbolType();
    mustBeIterable(iterType!, this.compileErrors, this.fieldId);

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${this.indent()}const elan_iter${this.fieldId} = [...${this.expression.compile()}];\r
${this.indent()}${this.breakPoint(this.debugSymbols())}for (const ${this.identifierDef.compile()} of elan_iter${this.fieldId}) {\r
${this.compileChildren()}\r
${this.indent()}}`;
  }

  resolveSymbol(id: string, caseSensitive: boolean, initialScope: Scope): ElanSymbol {
    const v = getId(this.identifierDef);

    if (match(id, v, caseSensitive)) {
      const iterSt = this.expression.symbolType();
      const st = isGenericSymbolType(iterSt) ? iterSt.ofTypes[0] : UnknownType.Instance;
      return {
        symbolId: id,
        symbolType: () => st,
        symbolScope: SymbolScope.counter,
        symbolIsType: false,
      };
    }

    return super.resolveSymbol(id, caseSensitive, initialScope);
  }

  symbolMatches(id: string, all: boolean, initialScope: Scope): ElanSymbol[] {
    const matches = super.symbolMatches(id, all, initialScope);
    const v = getId(this.identifierDef);

    const counter = {
      symbolId: v,
      symbolType: () => {
        const iterSt = this.expression.symbolType();
        return isGenericSymbolType(iterSt) ? iterSt.ofTypes[0] : UnknownType.Instance;
      },
      symbolScope: SymbolScope.counter,
      symbolIsType: false,
    };

    return matches.concat(symbolMatches(id, all, [counter]));
  }
}
