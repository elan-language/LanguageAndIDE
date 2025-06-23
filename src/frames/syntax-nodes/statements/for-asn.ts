import { getId, mustBeOfSymbolType } from "../../compile-rules";
import { AstNode } from "../../compiler-interfaces/ast-node";
import { ElanSymbol } from "../../frame-interfaces/elan-symbol";
import { Scope } from "../../frame-interfaces/scope";
import { Transforms } from "../../frame-interfaces/transforms";
import { IntType } from "../../symbols/int-type";
import { getGlobalScope } from "../../symbols/symbol-helpers";
import { SymbolScope } from "../../symbols/symbol-scope";
import { UnknownSymbol } from "../../symbols/unknown-symbol";
import { transforms } from "../ast-helpers";
import { EmptyAsn } from "../empty-asn";
import { FrameWithStatementsAsn } from "../frame-with-statements-asn";
import { OperationSymbol } from "../operation-symbol";
import { UnaryExprAsn } from "../unary-expr-asn";

export class ForAsn extends FrameWithStatementsAsn {
  isStatement: boolean = true;

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

    const id = this.getParentScope().resolveSymbol(v, transforms(), this);
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

    if (this.step instanceof UnaryExprAsn && this.step.op === OperationSymbol.Minus) {
      compare = ">=";
      incDec = "-";
      s = this.step.operand.compile();
    }

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${this.indent()}${this.breakPoint(this.debugSymbols())}for (${declare}${v} = ${f}; ${v} ${compare} ${t}; ${v} = ${v} ${incDec} ${s}) {\r
${this.compileChildren()}\r
${this.indent()}}`;
  }

  resolveSymbol(id: string, transforms: Transforms, initialScope: Scope): ElanSymbol {
    const v = getId(this.variable);

    if (id === v) {
      const st = this.from.symbolType();
      return {
        symbolId: id,
        symbolType: () => st,
        symbolScope: SymbolScope.counter,
      };
    }

    return super.resolveSymbol(id, transforms, initialScope);
  }

  symbolMatches(id: string, all: boolean, initialScope: Scope): ElanSymbol[] {
    const matches = super.symbolMatches(id, all, initialScope);
    const localMatches: ElanSymbol[] = [];

    const v = getId(this.variable);

    if (id === v || all) {
      const counter = {
        symbolId: v,
        symbolType: () => IntType.Instance,
        symbolScope: SymbolScope.counter,
      };
      localMatches.push(counter);
    }

    return localMatches.concat(matches);
  }
}
