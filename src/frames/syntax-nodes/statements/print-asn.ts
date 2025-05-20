import { AstNode } from "../../interfaces/ast-node";
import { Scope } from "../../interfaces/scope";
import { EmptyAsn } from "../empty-asn";
import { FrameAsn } from "../frame-asn";

export class PrintAsn extends FrameAsn {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  expr: AstNode = EmptyAsn.Instance;

  compile(): string {
    this.compileErrors = [];

    const toPrint = this.expr.compile() || '""';
    return `${this.indent()}${this.breakPoint(this.debugSymbols())}await system.printLine(${toPrint});`;
  }
}
