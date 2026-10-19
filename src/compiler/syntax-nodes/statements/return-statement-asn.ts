import { AstNode } from "../../compiler-interfaces/ast-node";
import { Scope } from "../../compiler-interfaces/scope";
import { BreakpointAsn } from "../breakpoint-asn";
import { EmptyAsn } from "../empty-asn";

export class ReturnStatementAsn extends BreakpointAsn {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  expression: AstNode = EmptyAsn.Instance;

  compile(): string {
    this.compileErrors = [];
    return `${this.indent()}${this.breakPoint(this.debugSymbols())}return ${this.expression.compile()};`;
  }
}
