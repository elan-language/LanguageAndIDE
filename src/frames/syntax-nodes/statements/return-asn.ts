import { AstNode } from "../../interfaces/ast-node";
import { Scope } from "../../interfaces/scope";
import { FrameAsn } from "../frame-asn";

export class ReturnStatement extends FrameAsn {
  isStatement = true;
  isReturnStatement = true;

  constructor(
    private readonly expr: AstNode,
    fieldId: string,
    scope: Scope,
  ) {
    super(fieldId, scope);
  }

  compile(): string {
    this.compileErrors = [];
    return `${this.indent()}${this.breakPoint(this.debugSymbols())}return ${this.expr.compile()};`;
  }
}
