import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { ElanSymbol } from "../../../compiler/compiler-interfaces/elan-symbol";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { IntType } from "../../../compiler/symbols/int-type";
import { getGlobalScope, symbolMatches } from "../../../compiler/symbols/symbol-helpers";
import { SymbolScope } from "../../../compiler/symbols/symbol-scope";
import { UnknownSymbol } from "../../../compiler/symbols/unknown-symbol";
import { getId, mustBeOfSymbolType } from "../../compile-rules";
import { CompoundAsn } from "../compound-asn";
import { EmptyAsn } from "../empty-asn";
import { UnaryExprAsn } from "../unary-expr-asn";

export class ForAsn extends CompoundAsn {
  constructor(fieldID: string, scope: Scope) {
    super(fieldID, scope);
  }

  variable: AstNode = EmptyAsn.Instance;
  from: AstNode = EmptyAsn.Instance;
  to: AstNode = EmptyAsn.Instance;
  step: AstNode = EmptyAsn.Instance;

  compile(): string {
    this.compileErrors = [];
    const v = this.variable.compile();
    const f = this.from.compile();
    const t = this.to.compile();
    let s = this.step.compile();

    const id = this.getParentScope().resolveSymbol(v, this);
    let declare = "";

    if (id instanceof UnknownSymbol) {
      declare = "let ";
    } else {
      mustBeOfSymbolType(id.symbolType(), IntType.Instance, this.compileErrors, this.fieldId);
    }

    mustBeOfSymbolType(this.from.symbolType(), IntType.Instance, this.compileErrors, this.fieldId);
    mustBeOfSymbolType(this.to.symbolType(), IntType.Instance, this.compileErrors, this.fieldId);
    mustBeOfSymbolType(this.step.symbolType(), IntType.Instance, this.compileErrors, this.fieldId);

    let compare = "<=";
    let incDec = "+";

    if (this.step instanceof UnaryExprAsn && this.step.isNegativeOperation()) {
      compare = ">=";
      incDec = "-";
      s = this.step.operand.compile();
    }

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${this.indent()}const _to${this.fieldId} = ${t};\r
${this.indent()}${this.breakPoint(this.debugSymbols())}for (${declare}${v} = ${f}; ${v} ${compare} _to${this.fieldId}; ${v} = ${v} ${incDec} ${s}) {\r
${this.compileChildren()}\r
${this.indent()}}`;
  }

  resolveSymbol(id: string, initialScope: Scope): ElanSymbol {
    const v = getId(this.variable);

    if (id === v) {
      const st = this.from.symbolType();
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
      symbolType: () => IntType.Instance,
      symbolScope: SymbolScope.counter,
    };

    return matches.concat(symbolMatches(id, all, [counter]));
  }
}
