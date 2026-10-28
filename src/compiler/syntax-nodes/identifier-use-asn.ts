import {
  getQualifierId,
  mustBeKnownSymbol,
  mustBePropertyPrefixedOnMember,
  mustBePublicMember,
  mustNotBeGlobalFunctionIfRef,
  mustNotBeKeyword,
} from "../compile-rules";
import { AstIdNode } from "../compiler-interfaces/ast-id-node";
import { AstNode } from "../compiler-interfaces/ast-node";
import { Scope } from "../compiler-interfaces/scope";
import { ClassType } from "../symbols/class-type";
import { NullScope } from "../symbols/null-scope";
import {
  getGlobalScope,
  isClass,
  isDefinitionScope,
  isMemberOnFieldsClass,
  isTuple,
  scopePrefix,
} from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { TupleType } from "../symbols/tuple-type";
import { UnknownType } from "../symbols/unknown-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { TupleInstanceAsn } from "./globals/tuple-asn";

export class IdentifierUseAsn extends AbstractAstNode implements AstIdNode {
  constructor(
    public readonly id: string,
    public readonly precedingNode: AstNode,
    public readonly fieldId: string,
    private scope: Scope,
  ) {
    super();
  }

  isAsync: boolean = false;

  getCurrentScope() {
    const lhsSt = this.precedingNode.symbolType();

    if (lhsSt instanceof TupleType) {
      return new TupleInstanceAsn(lhsSt, this.scope);
    }

    if (lhsSt instanceof ClassType) {
      return lhsSt.scope;
    }

    return this.scope;
  }

  getSymbol() {
    let searchScope = this.getCurrentScope();
    if (isClass(searchScope)) {
      return searchScope.resolveOwnSymbol(this.id, true);
    }

    if (isTuple(searchScope)) {
      return searchScope.resolveOwnSymbol(this.id);
    }

    if (isDefinitionScope(this.scope)) {
      searchScope = this.scope.getParentScope();
    }

    return searchScope.resolveSymbol(this.id, true, this.scope);
  }

  get symbolScope() {
    return this.getSymbol().symbolScope;
  }

  getCode(prefix: string) {
    const searchScope = this.getCurrentScope();
    if (searchScope instanceof TupleInstanceAsn) {
      const [ok, index] = searchScope.parseId(this.id);
      if (ok) {
        return `${prefix.slice(0, -1)}[${index}]`;
      }
    }

    return `${prefix}${this.id}`;
  }

  compile(): string {
    this.compileErrors = [];

    const symbol = this.getSymbol();
    const searchScope = this.getCurrentScope();

    mustNotBeKeyword(this.id, this.compileErrors, this.fieldId);

    mustBeKnownSymbol(
      symbol,
      searchScope,
      this.precedingNode ? getQualifierId(this.precedingNode) : symbol.symbolId,
      this.precedingNode ? this.precedingNode.symbolType() : UnknownType.Instance,
      this.compileErrors,
      this.fieldId,
      this.scope,
    );

    if (!isMemberOnFieldsClass(symbol, searchScope)) {
      mustBePublicMember(symbol, this.compileErrors, this.fieldId);
    }

    if (symbol.symbolScope === SymbolScope.member && searchScope === NullScope.Instance) {
      mustBePropertyPrefixedOnMember(this.scope, this.compileErrors, this.fieldId);
    }

    mustNotBeGlobalFunctionIfRef(symbol, this.compileErrors, this.fieldId);

    const prefix = scopePrefix(
      symbol,
      this.precedingNode,
      this.compileErrors,
      searchScope,
      this.fieldId,
    );

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    const tupleScope = this.getCurrentScope();
    if (tupleScope instanceof TupleInstanceAsn) {
      const [ok, index] = tupleScope.parseId(this.id);
      if (ok) {
        return `${prefix.slice(0, -1)}[${index}]`;
      }
    }

    return `${prefix}${this.id}`;
  }

  symbolType() {
    return this.getSymbol().symbolType();
  }

  toString() {
    return this.id;
  }
}
