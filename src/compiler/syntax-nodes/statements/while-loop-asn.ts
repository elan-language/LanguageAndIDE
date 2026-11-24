import { mustBeOfType } from "../../compile-rules";
import { AstNode } from "../../compiler-interfaces/ast-node";
import { Scope } from "../../compiler-interfaces/scope";
import { BooleanType } from "../../symbols/boolean-type";
import { getGlobalScope } from "../../symbols/symbol-helpers";
import { CompoundAsn } from "../compound-asn";
import { EmptyAsn } from "../empty-asn";

export class WhileLoopAsn extends CompoundAsn {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  condition: AstNode = EmptyAsn.Instance;

  compile(): string {
    this.compileErrors = [];
    mustBeOfType(
      this.condition,
      BooleanType.Instance,
      this.compileErrors,
      this.fieldId,
      this.scope,
    );

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${this.indent()}${this.breakPoint(this.debugSymbols())}while (${this.condition.compile()}) {\r
${this.compileChildren()}\r
${this.indent()}}`;
  }
}
