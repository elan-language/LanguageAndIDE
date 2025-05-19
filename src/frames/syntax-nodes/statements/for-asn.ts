import { getId, mustBeOfSymbolType } from "../../compile-rules";
import { AstNode } from "../../interfaces/ast-node";
import { ElanSymbol } from "../../interfaces/elan-symbol";
import { Scope } from "../../interfaces/scope";
import { Transforms } from "../../interfaces/transforms";
import { IntType } from "../../symbols/int-type";
import { SymbolScope } from "../../symbols/symbol-scope";
import { UnknownSymbol } from "../../symbols/unknown-symbol";
import { transforms } from "../ast-helpers";
import { FrameWithStatementsAsn } from "../frame-with-statements-asn";

export class ForASn extends FrameWithStatementsAsn {
  isStatement: boolean = true;

  constructor(
    private readonly variable: AstNode,
    private readonly from: AstNode,
    private readonly to: AstNode,
    private readonly step: AstNode,

    children: AstNode[],
    fieldID: string,
    scope: Scope,
  ) {
    super(children, fieldID, scope);
  }

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
      mustBeOfSymbolType(
        id.symbolType(transforms()),
        IntType.Instance,
        this.compileErrors,
        this.fieldId,
      );
    }

    mustBeOfSymbolType(this.from.symbolType(), IntType.Instance, this.compileErrors, this.fieldId);
    mustBeOfSymbolType(this.to.symbolType(), IntType.Instance, this.compileErrors, this.fieldId);
    mustBeOfSymbolType(this.step.symbolType(), IntType.Instance, this.compileErrors, this.fieldId);

    let compare = "<=";
    let incDec = "+";

    if (s.startsWith("-")) {
      compare = ">=";
      incDec = "-";
      s = s.slice(1);
    }

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

  symbolMatches(id: string, all: boolean, _initialScope: Scope): ElanSymbol[] {
    const matches = super.symbolMatches(id, all, this);
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
