import { CompileError } from "../compile-error";
import { mustBeKnownSymbol, mustBePublicProperty, mustNotBeKeyword } from "../compile-rules";
import { isMember } from "../helpers";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { transforms } from "./ast-helpers";
import { AstIdNode } from "../interfaces/ast-id-node";
import { SymbolScope } from "../symbols/symbol-scope";
import { LetStatement } from "../statements/let-statement";
import { DeconstructedTupleType } from "../symbols/deconstructed-tuple-type";
import { ChainedAsn } from "./chained-asn";
import { AstNode } from "../interfaces/ast-node";
import { isPropertyOnFieldsClass } from "../symbols/symbol-helpers";

export class IdAsn extends AbstractAstNode implements AstIdNode, ChainedAsn {
  constructor(
    public readonly id: string,
    public readonly fieldId: string,
    private scope: Scope,
  ) {
    super();
    this.id = id.trim();
  }

  private classScope?: Scope;

  updateScopeAndChain(s: Scope, ast: AstNode) {
    this.classScope = s;
  }

  get showPreviousNode() {
    return true;
  }

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors;
  }

  compile(): string {
    this.compileErrors = [];

    mustNotBeKeyword(this.id, this.compileErrors, this.fieldId);

    if (isMember(this.scope)) {
      // don't prefix properties with this
      return this.id;
    }

    const searchScope = this.classScope ?? this.scope.getParentScope();

    const symbol = searchScope.resolveSymbol(this.id, transforms(), this.scope);

    mustBeKnownSymbol(symbol, this.compileErrors, this.fieldId);

    if (symbol instanceof LetStatement) {
      return `${this.id}()`;
    }
    if (symbol.symbolScope === SymbolScope.stdlib) {
      return `_stdlib.${this.id}`;
    }
    if (symbol.symbolScope === SymbolScope.property && !this.classScope) {
      return `this.${this.id}`;
    }
    if (!isPropertyOnFieldsClass(symbol, this.scope)) {
      mustBePublicProperty(symbol, this.compileErrors, this.fieldId);
    }

    return this.id;
  }

  symbolType() {
    const searchScope = this.classScope ?? this.scope.getParentScope();

    const st = searchScope
      .resolveSymbol(this.id, transforms(), this.scope)
      .symbolType(transforms());

    if (st instanceof DeconstructedTupleType) {
      return st.symbolTypeFor(this.id);
    }
    return st;
  }

  get symbolScope() {
    const searchScope = this.classScope ?? this.scope.getParentScope();

    const st = searchScope.resolveSymbol(this.id, transforms(), this.scope).symbolScope;

    return st;
  }

  toString() {
    return this.id;
  }
}
