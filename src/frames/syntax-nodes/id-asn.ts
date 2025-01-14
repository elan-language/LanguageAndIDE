import { CompileError } from "../compile-error";
import {
  mustBeFunctionRefIfFunction,
  mustBeKnownSymbol,
  mustBePropertyPrefixedOnMember,
  mustBePublicMember,
  mustNotBeKeyword,
} from "../compile-rules";
import { AstIdNode } from "../interfaces/ast-id-node";
import { AstNode } from "../interfaces/ast-node";
import { Scope } from "../interfaces/scope";
import { isDeconstructedType, isMemberOnFieldsClass, scopePrefix } from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { transforms } from "./ast-helpers";
import { ChainedAsn } from "./chained-asn";

export class IdAsn extends AbstractAstNode implements AstIdNode, ChainedAsn {
  constructor(
    public readonly id: string,
    public readonly fieldId: string,
    private readonly isFuncRef: boolean,
    private scope: Scope,
  ) {
    super();
  }

  private updatedScope?: Scope;

  updateScopeAndChain(s: Scope, _ast: AstNode) {
    this.updatedScope = s;
  }

  get showPreviousNode() {
    return true;
  }

  isAsync: boolean = false;

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors;
  }

  getSymbol() {
    const searchScope = this.updatedScope ?? this.scope.getParentScope();
    return searchScope.resolveSymbol(this.id, transforms(), this.scope);
  }

  get symbolScope() {
    return this.getSymbol().symbolScope;
  }

  compile(): string {
    this.compileErrors = [];

    const symbol = this.getSymbol();

    mustNotBeKeyword(this.id, this.compileErrors, this.fieldId);
    mustBeKnownSymbol(symbol, this.updatedScope, this.compileErrors, this.fieldId);

    if (!isMemberOnFieldsClass(symbol, transforms(), this.scope)) {
      mustBePublicMember(symbol, this.compileErrors, this.fieldId);
    }

    if (symbol.symbolScope === SymbolScope.member && !this.updatedScope) {
      mustBePropertyPrefixedOnMember(this.compileErrors, this.fieldId);
    }

    if (!this.isFuncRef) {
      mustBeFunctionRefIfFunction(symbol, this.compileErrors, this.fieldId);
    }

    const prefix = this.updatedScope
      ? ""
      : scopePrefix(symbol, this.compileErrors, this.scope, this.fieldId);

    const postfix = symbol.symbolScope === SymbolScope.outParameter ? "[0]" : "";

    return `${prefix}${this.id}${postfix}`;
  }

  symbolType() {
    const st = this.getSymbol().symbolType(transforms());

    if (isDeconstructedType(st)) {
      return st.symbolTypeFor(this.id);
    }
    return st;
  }

  toString() {
    return this.id;
  }
}
