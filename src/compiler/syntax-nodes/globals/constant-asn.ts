import {
  getId,
  mustBeCompatibleDefinitionNode,
  mustBeUniqueNameInScope,
} from "../../compile-rules";
import { AstNode } from "../../compiler-interfaces/ast-node";
import { GlobalConstant } from "../../compiler-interfaces/global-constant";
import { Scope } from "../../compiler-interfaces/scope";
import { SymbolType } from "../../compiler-interfaces/symbol-type";
import { getGlobalScope } from "../../symbols/symbol-helpers";
import { SymbolScope } from "../../symbols/symbol-scope";
import { BreakpointAsn } from "../breakpoint-asn";
import { EmptyAsn } from "../empty-asn";

export class ConstantAsn extends BreakpointAsn implements AstNode, GlobalConstant {
  constructor(fieldId: string, scope: Scope) {
    super(fieldId, scope);
  }

  isGlobalConstant = true;

  symbolIsType: boolean = false;

  identifierDef: AstNode = EmptyAsn.Instance;
  constantValue: AstNode = EmptyAsn.Instance;

  get symbolId() {
    return getId(this.identifierDef);
  }

  symbolType(): SymbolType {
    return this.constantValue.symbolType();
  }

  get symbolScope() {
    return SymbolScope.program;
  }

  compile(): string {
    this.compileErrors = [];
    const name = this.identifierDef.compile();
    const value = this.constantValue.compile();
    mustBeUniqueNameInScope(name, getGlobalScope(this.scope), this.compileErrors, this.fieldId);

    mustBeCompatibleDefinitionNode(this.constantValue, true, this.compileErrors, this.fieldId);

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${name} = ${value};\r
`;
  }
}
