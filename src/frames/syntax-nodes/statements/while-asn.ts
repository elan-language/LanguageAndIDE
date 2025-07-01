import { mustBeOfType } from "../../compile-rules";
import { AstNode } from "../../compiler-interfaces/ast-node";
import { Scope } from "../../compiler-interfaces/scope";
import { BooleanType } from "../../symbols/boolean-type";
import { getGlobalScope } from "../../symbols/symbol-helpers";
import { EmptyAsn } from "../empty-asn";
import { FrameWithStatementsAsn } from "../frame-with-statements-asn";

export class WhileAsn extends FrameWithStatementsAsn {
  isStatement = true;

  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  condition: AstNode = EmptyAsn.Instance;

  compile(): string {
    this.compileErrors = [];
    mustBeOfType(this.condition, BooleanType.Instance, this.compileErrors, this.fieldId);

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${this.indent()}${this.breakPoint(this.debugSymbols())}while (${this.condition.compile()}) {\r
${this.compileChildren()}\r
${this.indent()}}`;
  }
}
