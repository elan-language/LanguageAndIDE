import { Scope } from "../../compiler-interfaces/scope";
import { getGlobalScope } from "../../symbols/symbol-helpers";
import { CompoundAsn } from "../compound-asn";

export class ThenClauseAsn extends CompoundAsn {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  getCurrentScope(): Scope {
    return this.compileScope ?? this;
  }

  indent() {
    return this.singleIndent(); //overrides the additional indent added for most child statements
  }

  getOuterScope() {
    // need to get scope of IfStatement
    return this.getCurrentScope().getParentScope();
  }

  compile(): string {
    this.compileErrors = [];

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${this.breakPoint(this.debugSymbols())}${this.compileChildren()}\r`;
  }
}
