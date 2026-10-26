import { mustBeOfType } from "../../compile-rules";
import { AstNode } from "../../compiler-interfaces/ast-node";
import { Scope } from "../../compiler-interfaces/scope";
import { BooleanType } from "../../symbols/boolean-type";
import { getGlobalScope } from "../../symbols/symbol-helpers";
import { CompoundAsn } from "../compound-asn";
import { EmptyAsn } from "../empty-asn";

export class ElseIfClauseAsn extends CompoundAsn {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  condition: AstNode = EmptyAsn.Instance;

  private compileIfClause(): string {
    mustBeOfType(
      this.condition,
      BooleanType.Instance,
      this.compileErrors,
      this.fieldId,
      this.scope,
    );
    return `if (${this.condition.compile()}) {`;
  }

  getCurrentScope(): Scope {
    return this.compileScope ?? this;
  }

  indent() {
    return this.singleIndent(); //overrides the additional indent added for most child statements
  }

  compile(): string {
    this.compileErrors = [];

    const code = `${this.indent()}} else ${this.compileIfClause()}
${this.compileChildren()}`;

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return code;
  }

  getOuterScope() {
    // need to get scope of IfStatement
    return this.getCurrentScope().getParentScope();
  }
}
