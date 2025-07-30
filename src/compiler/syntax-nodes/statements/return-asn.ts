import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { BreakpointAsn } from "../breakpoint-asn";
import { EmptyAsn } from "../empty-asn";

export class ReturnAsn extends BreakpointAsn {
  isReturnStatement = true;

  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  expr: AstNode = EmptyAsn.Instance;

  compile(): string {
    this.compileErrors = [];
    return `${this.indent()}${this.breakPoint(this.debugSymbols())}return ${this.expr.compile()};`;
  }
}
