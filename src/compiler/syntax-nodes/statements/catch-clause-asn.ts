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

  indent() {
    return this.singleIndent(); //overrides the additional indent added for most child statements
  }

  compile(): string {
    this.compileErrors = [];

    const type = this.scope.resolveSymbol(this.type.compile(), false, this);
    const scope = type.symbolScope === SymbolScope.stdlib ? "_stdlib." : "";

    mustBeException(type, this.compileErrors, this.fieldId);

    const code = `${this.indent()}} catch (${this.idNode.compile()}) {
${this.indent()}${this.indent()}if (e instanceof ${scope}${type.symbolId}) {
${this.compileChildren()}
${this.indent()}${this.indent()}}
${this.indent()}${this.indent()}else {
${this.indent()}${this.indent()}${this.indent()}throw e;
${this.indent()}${this.indent()}}`;

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return code;
  }
}
