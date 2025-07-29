import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { BooleanType } from "../../../compiler/symbols/boolean-type";
import { getGlobalScope } from "../../../compiler/symbols/symbol-helpers";
import { mustBeOfType } from "../../compile-rules";
import { CompoundAsn } from "../compound-asn";
import { EmptyAsn } from "../empty-asn";

export class RepeatAsn extends CompoundAsn {
  isStatement: boolean = true;

  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  condition: AstNode = EmptyAsn.Instance;

  compile(): string {
    this.compileErrors = [];
    mustBeOfType(this.condition, BooleanType.Instance, this.compileErrors, this.fieldId);

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${this.indent()}${this.breakPoint(this.debugSymbols())}do {\r
${this.compileChildren()}\r
${this.indent()}} while (!(${this.condition.compile()}));`;
  }
}
