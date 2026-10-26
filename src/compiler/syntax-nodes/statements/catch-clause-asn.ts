import { mustBeException } from "../../compile-rules";
import { AstNode } from "../../compiler-interfaces/ast-node";
import { Scope } from "../../compiler-interfaces/scope";
import { getGlobalScope } from "../../symbols/symbol-helpers";
import { SymbolScope } from "../../symbols/symbol-scope";
import { CompoundAsn } from "../compound-asn";

export class CatchClauseAsn extends CompoundAsn {
  hasIf: boolean = false;

  constructor(
    private readonly idNode: AstNode,
    private readonly type: AstNode,
    fieldId: string,
    scope: Scope,
  ) {
    super(fieldId, scope);
  }

  indentN(count?: number | undefined): string {
    if (count && count > 1) {
      return this.singleIndent() + this.indentN(--count);
    }

    return this.singleIndent();
  }

  compile(): string {
    this.compileErrors = [];

    const type = this.scope.resolveSymbol(this.type.compile(), false, this);
    const scope = type.symbolScope === SymbolScope.stdlib ? "_stdlib." : "";

    mustBeException(type, this.compileErrors, this.fieldId);

    const code = `${this.indentN()}} catch (${this.idNode.compile()}) {
${this.indentN(2)}if (e instanceof ${scope}${type.symbolId}) {
${this.compileChildren()}
${this.indentN(2)}}
${this.indentN(2)}else {
${this.indentN(3)}throw e;
${this.indentN(2)}}`;

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return code;
  }
}
