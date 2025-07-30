import { AstIdNode } from "../../compiler/compiler-interfaces/ast-id-node";
import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { ChainedAsn } from "../../compiler/compiler-interfaces/chained-asn";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { NullScope } from "../../compiler/symbols/null-scope";
import {
  getGlobalScope,
  isDeconstructedType,
  isDefinitionScope,
  isMemberOnFieldsClass,
  scopePrefix,
} from "../../compiler/symbols/symbol-helpers";
import { SymbolScope } from "../../compiler/symbols/symbol-scope";
import { UnknownType } from "../../compiler/symbols/unknown-type";
import {
  mustBeFunctionRefIfFunction,
  mustBeGlobalFunctionIfRef,
  mustBeKnownSymbol,
  mustBePropertyPrefixedOnMember,
  mustBePublicMember,
  mustNotBeKeyword,
} from "../compile-rules";
import { AbstractAstNode } from "./abstract-ast-node";
import { ClassAsn } from "./globals/class-asn";
import { TupleAsn } from "./globals/tuple-asn";

function isClass(s: Scope): s is ClassAsn {
  return s instanceof ClassAsn;
}

function isTuple(s: Scope): s is TupleAsn {
  return s instanceof TupleAsn;
}

export class IdAsn extends AbstractAstNode implements AstIdNode, ChainedAsn {
  constructor(
    public readonly id: string,
    public readonly fieldId: string,
    private readonly isFuncRef: boolean,
    private scope: Scope,
  ) {
    super();
  }

  private updatedScope: Scope = NullScope.Instance;
  private precedingNode?: AstNode = undefined;

  updateScopeAndChain(s: Scope, ast: AstNode) {
    this.updatedScope = s;
    this.precedingNode = ast;
  }

  get showPreviousNode() {
    return !isTuple(this.updatedScope);
  }

  isAsync: boolean = false;

  getSymbol() {
    let searchScope = this.updatedScope === NullScope.Instance ? this.scope : this.updatedScope;
    if (isClass(searchScope)) {
      return searchScope.resolveOwnSymbol(this.id);
    }

    if (isTuple(searchScope)) {
      return searchScope.resolveOwnSymbol(this.id);
    }

    if (isDefinitionScope(this.scope)) {
      searchScope = this.scope.getParentScope();
    }

    return searchScope.resolveSymbol(this.id, this.scope);
  }

  get symbolScope() {
    return this.getSymbol().symbolScope;
  }

  getBody() {
    if (this.updatedScope instanceof TupleAsn) {
      const [ok, index] = this.updatedScope.parseId(this.id);
      if (ok) {
        const tuple = this.precedingNode?.compile();
        return `${tuple}[${index}]`;
      }
    }

    return this.id;
  }

  compile(): string {
    this.compileErrors = [];

    const symbol = this.getSymbol();

    mustNotBeKeyword(this.id, this.compileErrors, this.fieldId);
    mustBeKnownSymbol(
      symbol,
      this.updatedScope,
      UnknownType.Instance,
      this.compileErrors,
      this.fieldId,
    );

    if (!isMemberOnFieldsClass(symbol, this.scope)) {
      mustBePublicMember(symbol, this.compileErrors, this.fieldId);
    }

    if (symbol.symbolScope === SymbolScope.member && this.updatedScope === NullScope.Instance) {
      mustBePropertyPrefixedOnMember(this.compileErrors, this.fieldId);
    }

    if (!this.isFuncRef) {
      mustBeFunctionRefIfFunction(symbol, this.id, this.compileErrors, this.fieldId);
    } else {
      mustBeGlobalFunctionIfRef(symbol, this.id, this.compileErrors, this.fieldId);
    }

    const prefix =
      this.updatedScope !== NullScope.Instance
        ? ""
        : scopePrefix(symbol, this.compileErrors, this.scope, this.fieldId);

    const postfix = symbol.symbolScope === SymbolScope.outParameter ? "[0]" : "";

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    const body = this.getBody();

    return `${prefix}${body}${postfix}`;
  }

  symbolType() {
    const st = this.getSymbol().symbolType();

    if (isDeconstructedType(st)) {
      return st.symbolTypeFor(this.id);
    }
    return st;
  }

  toString() {
    return this.id;
  }
}
