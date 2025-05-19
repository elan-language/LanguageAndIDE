import { AstNode } from "../../interfaces/ast-node";
import { Scope } from "../../interfaces/scope";
import { FrameWithStatementsAsn } from "../frame-with-statements-asn";

export class TryAsn extends FrameWithStatementsAsn {
  constructor(children: AstNode[], fieldId: string, scope: Scope) {
    super(children, fieldId, scope);
  }

  compile(): string {
    this.compileErrors = [];

    return `${this.indent()}${this.breakPoint(this.debugSymbols())}try {\r
${this.compileChildren()}\r
${this.indent()}}`;
  }
}
