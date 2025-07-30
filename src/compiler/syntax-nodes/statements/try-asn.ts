import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { CompoundAsn } from "../compound-asn";

export class TryAsn extends CompoundAsn {
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
