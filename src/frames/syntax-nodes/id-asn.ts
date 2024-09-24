import { CompileError } from "../compile-error";
import { mustBeKnownSymbol, mustBePublicProperty, mustNotBeKeyword } from "../compile-rules";
import { isMember } from "../helpers";
import { AstIdNode } from "../interfaces/ast-id-node";
import { AstNode } from "../interfaces/ast-node";
import { Scope } from "../interfaces/scope";
import { LetStatement } from "../statements/let-statement";
import { DeconstructedTupleType } from "../symbols/deconstructed-tuple-type";
import {
  isDeconstructedType,
  isPropertyOnFieldsClass,
  scopePrefix,
} from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { transforms } from "./ast-helpers";
import { ChainedAsn } from "./chained-asn";

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

    if (!isPropertyOnFieldsClass(symbol, transforms(), this.scope)) {
      mustBePublicProperty(symbol, this.compileErrors, this.fieldId);
    }

    let postfix = "";

    if (symbol.symbolScope === SymbolScope.outParameter) {
      postfix = `[0]`;
    }

    if (symbol instanceof LetStatement) {
      postfix = `${postfix}()`;
    }

    const prefix = this.classScope ? "" : scopePrefix(symbol, this.scope);

    return `${prefix}${this.id}${postfix}`;
  }

  symbolType() {
    const searchScope = this.classScope ?? this.scope.getParentScope();

    const st = searchScope
      .resolveSymbol(this.id, transforms(), this.scope)
      .symbolType(transforms());

    if (isDeconstructedType(st)) {
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
