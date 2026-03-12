import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { AstNode } from "../../compiler-interfaces/ast-node";
import { SymbolScope } from "../../symbols/symbol-scope";
import { BreakpointAsn } from "../breakpoint-asn";

export class ThrowAsn extends BreakpointAsn {
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

    return `${this.indent()}${this.breakPoint(this.debugSymbols())}throw new ${scope}${type.symbolId}(${this.msg.compile()});`;
  }
}
