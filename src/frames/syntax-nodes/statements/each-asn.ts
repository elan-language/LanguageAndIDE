import { getId, mustBeIterable, mustNotBeRedefined } from "../../compile-rules";
import { AstNode } from "../../interfaces/ast-node";
import { ElanSymbol } from "../../interfaces/elan-symbol";
import { Scope } from "../../interfaces/scope";
import { Transforms } from "../../interfaces/transforms";
import { isGenericSymbolType } from "../../symbols/symbol-helpers";
import { SymbolScope } from "../../symbols/symbol-scope";
import { UnknownType } from "../../symbols/unknown-type";
import { transforms } from "../ast-helpers";
import { FrameWithStatementsAsn } from "../frame-with-statements-asn";

export class EachAsn extends FrameWithStatementsAsn {
  isStatement = true;

  constructor(
    private readonly variable: AstNode,
    private readonly iter: AstNode,
    fieldId: string,
    scope: Scope,
  ) {
    super(fieldId, scope);
  }

  compile(): string {
    this.compileErrors = [];

    const id = this.variable.compile();
    const symbol = this.scope.resolveSymbol(id, transforms(), this);

    mustNotBeRedefined(symbol, this.compileErrors, this.fieldId);

    const iterType = this.iter.symbolType();
    mustBeIterable(iterType!, this.compileErrors, this.fieldId);

    return `${this.indent()}${this.breakPoint(this.debugSymbols())}for (const ${this.variable.compile()} of ${this.iter.compile()}) {\r
${this.compileChildren()}\r
${this.indent()}}`;
  }

  resolveSymbol(id: string, transforms: Transforms, initialScope: Scope): ElanSymbol {
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
      const symbol = super.resolveSymbol(id, transforms, this);
      return {
        symbolId: id,
        symbolType: () => symbol.symbolType(),
        symbolScope: SymbolScope.counter,
      };
    }

    return super.resolveSymbol(id, transforms, initialScope);
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
