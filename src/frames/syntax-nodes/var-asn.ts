import {
  mustBeKnownSymbol,
  mustBePropertyPrefixedOnMember,
  mustBePublicMember,
} from "../compile-rules";
import { AstIndexableNode } from "../interfaces/ast-indexable-node";
import { AstQualifierNode } from "../interfaces/ast-qualifier-node";
import { Scope } from "../interfaces/scope";
import { NullScope } from "../symbols/null-scope";
import {
  getGlobalScope,
  isDeconstructedType,
  isMemberOnFieldsClass,
  scopePrefix,
  updateScope,
} from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { UnknownType } from "../symbols/unknown-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { compileSimpleSubscript, getIndexAndOfType, isEmptyNode, transforms } from "./ast-helpers";
import { EmptyAsn } from "./empty-asn";
import { IndexAsn } from "./index-asn";

export class VarAsn extends AbstractAstNode implements AstIndexableNode {
  constructor(
    public readonly id: string,
    public readonly isAssignable: boolean,
    public readonly qualifier: AstQualifierNode | EmptyAsn,
    private readonly index: IndexAsn | EmptyAsn,
    public readonly fieldId: string,
    private scope: Scope,
  ) {
    super();
  }

  isSimpleSubscript() {
    return this.index instanceof IndexAsn && this.index.isSimpleSubscript();
  }

  getSymbol() {
    const currentScope = updateScope(this.qualifier, this.scope);
    return currentScope.resolveSymbol(this.id, transforms(), this.scope);
  }

  compileSimpleSubscript(id: string, prefix: string, postfix: string) {
    return compileSimpleSubscript(
      id,
      this.rootSymbolType(),
      this.index as IndexAsn,
      prefix,
      this.id,
      postfix,
      this.compileErrors,
      this.fieldId,
    );
  }

  compile(): string {
    this.compileErrors = [];

    const symbol = this.getSymbol();

    if (!isMemberOnFieldsClass(symbol, transforms(), this.scope)) {
      mustBePublicMember(symbol, this.compileErrors, this.fieldId);
    }

    mustBeKnownSymbol(
      symbol,
      NullScope.Instance,
      UnknownType.Instance,
      this.compileErrors,
      this.fieldId,
    );

    if (symbol.symbolScope === SymbolScope.member && isEmptyNode(this.qualifier)) {
      mustBePropertyPrefixedOnMember(this.compileErrors, this.fieldId);
    }

    const prefix = scopePrefix(symbol, this.compileErrors, this.scope, this.fieldId);
    const postfix = !isEmptyNode(this.index)
      ? this.index.compile()
      : symbol.symbolScope === SymbolScope.outParameter
        ? "[0]"
        : "";

    // handles indexing within call statement
    const code = this.isSimpleSubscript()
      ? this.compileSimpleSubscript(symbol.symbolId, prefix, postfix)
      : `${prefix}${this.id}${postfix}`;

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return code;
  }

  rootSymbolType() {
    return this.getSymbol().symbolType();
  }

  symbolType() {
    const rootType = this.rootSymbolType();

    if (isDeconstructedType(rootType)) {
      return rootType.symbolTypeFor(this.id);
    }

    return this.isSimpleSubscript() ? getIndexAndOfType(rootType)[1] : rootType;
  }

  get symbolScope() {
    return this.getSymbol().symbolScope;
  }

  toString() {
    return `${this.qualifier}${this.id}${this.index}`;
  }
}
