import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { CompoundAsn } from "../compound-asn";
import { EmptyAsn } from "../empty-asn";

export class PrintAsn extends CompoundAsn {
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
