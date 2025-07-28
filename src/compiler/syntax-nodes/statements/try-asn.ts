import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { FrameWithStatementsAsn } from "../frame-with-statements-asn";

export class TryAsn extends FrameWithStatementsAsn {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  compile(): string {
    this.compileErrors = [];

    return `${this.indent()}${this.breakPoint(this.debugSymbols())}try {\r
${this.compileChildren()}\r
${this.indent()}}`;
  }
}
