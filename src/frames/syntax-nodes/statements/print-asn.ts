import { AstNode } from "../../interfaces/ast-node";
import { Scope } from "../../interfaces/scope";
import { FrameAsn } from "../frame-asn";

export class PrintAsn extends FrameAsn {
  isStatement = true;

  constructor(
    private readonly expr: AstNode,
    fieldId: string,
    scope: Scope,
  ) {
    super(fieldId, scope);
  }

  compile(): string {
    this.compileErrors = [];

    const toPrint = this.expr.compile() || '""';
    return `${this.indent()}${this.breakPoint(this.debugSymbols())}await system.printLine(${toPrint});`;
  }
}
