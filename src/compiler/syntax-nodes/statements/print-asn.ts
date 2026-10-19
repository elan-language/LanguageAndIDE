import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { mustNotBeEnum } from "../../compile-rules";
import { getGlobalScope } from "../../symbols/symbol-helpers";
import { BreakpointAsn } from "../breakpoint-asn";
import { EmptyAsn } from "../empty-asn";

export class PrintAsn extends BreakpointAsn {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  expression: AstNode = EmptyAsn.Instance;

  compile(): string {
    this.compileErrors = [];

    const toPrint = `${this.expression.compile()}`;
    mustNotBeEnum(this.expression.symbolType(), this.compileErrors, this.fieldId);
    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);
    return `${this.indent()}${this.breakPoint(this.debugSymbols())}await _stdlib.print(${toPrint});`;
  }
}
