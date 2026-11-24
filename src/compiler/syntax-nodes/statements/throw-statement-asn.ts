import { mustBeException } from "../../compile-rules";
import { AstNode } from "../../compiler-interfaces/ast-node";
import { Scope } from "../../compiler-interfaces/scope";
import { getGlobalScope } from "../../symbols/symbol-helpers";
import { SymbolScope } from "../../symbols/symbol-scope";
import { BreakpointAsn } from "../breakpoint-asn";

export class ThrowStatementAsn extends BreakpointAsn {
  constructor(
    private readonly type: string,
    private readonly msg: AstNode,
    fieldId: string,
    scope: Scope,
  ) {
    super(fieldId, scope);
  }

  compile(): string {
    this.compileErrors = [];

    const type = this.scope.resolveSymbol(this.type, false, this);
    const scope = type.symbolScope === SymbolScope.stdlib ? "_stdlib." : "";

    mustBeException(type, this.compileErrors, this.fieldId);

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${this.indent()}${this.breakPoint(this.debugSymbols())}throw system.initialise(await new ${scope}${type.symbolId}()._initialise(${this.msg.compile()}));`;
  }
}
