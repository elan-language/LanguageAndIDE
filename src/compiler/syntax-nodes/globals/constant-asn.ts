import { AstNode } from "../../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../../compiler/compiler-interfaces/scope";
import { SymbolType } from "../../../compiler/compiler-interfaces/symbol-type";
import { getGlobalScope } from "../../../compiler/symbols/symbol-helpers";
import { SymbolScope } from "../../../compiler/symbols/symbol-scope";
import { getId, mustBeUniqueNameInScope } from "../../compile-rules";
import { GlobalConstant } from "../../compiler-interfaces/global-constant";
import { BreakpointAsn } from "../breakpoint-asn";
import { EmptyAsn } from "../empty-asn";

export class GlobalConstantAsn extends BreakpointAsn implements AstNode, GlobalConstant {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  isGlobalConstant = true;

  name: AstNode = EmptyAsn.Instance;
  value: AstNode = EmptyAsn.Instance;

  get symbolId() {
    return getId(this.name);
  }

  symbolType(): SymbolType {
    return this.value.symbolType();
  }

  get symbolScope() {
    return SymbolScope.program;
  }

  compile(): string {
    this.compileErrors = [];
    const name = this.name.compile();
    mustBeUniqueNameInScope(name, getGlobalScope(this.scope), this.compileErrors, this.fieldId);

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${name} = ${this.value.compile()};\r
`;
  }
}
