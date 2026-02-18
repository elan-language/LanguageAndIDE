import { AstIndexableNode } from "../../compiler/compiler-interfaces/ast-indexable-node";
import { AstQualifierNode } from "../../compiler/compiler-interfaces/ast-qualifier-node";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { NullScope } from "../../compiler/symbols/null-scope";
import {
  getGlobalScope,
  isMemberOnFieldsClass,
  scopePrefix,
  updateScope,
} from "../../compiler/symbols/symbol-helpers";
import { SymbolScope } from "../../compiler/symbols/symbol-scope";
import { UnknownType } from "../../compiler/symbols/unknown-type";
import {
  mustBeKnownSymbol,
  mustBePropertyPrefixedOnMember,
  mustBePublicMember,
} from "../compile-rules";
import { AstCollectionNode } from "../compiler-interfaces/ast-collection-node";
import { AbstractAstNode } from "./abstract-ast-node";
import { compileSimpleSubscript, getIndexAndOfType, isEmptyNode } from "./ast-helpers";
import { EmptyAsn } from "./empty-asn";
import { IndexAsn } from "./index-asn";

export class VarAsn extends AbstractAstNode implements AstIndexableNode {
  constructor(
    public readonly id: string,
    public readonly isAssignable: boolean,
    public readonly qualifier: AstQualifierNode | EmptyAsn,
    public readonly indices: AstCollectionNode,
    public readonly fieldId: string,
    private scope: Scope,
  ) {
    super();
  }

  private rhs?: string;

  setRHS(code: string) {
    this.rhs = code;
  }

  isSimpleSubscript() {
    const index =
      this.indices.items.length > 0
        ? this.indices.items[this.indices.items.length - 1]
        : EmptyAsn.Instance;
    return index instanceof IndexAsn && index.isSimpleSubscript();
  }

  isRangeSubscript() {
    const index =
      this.indices.items.length > 0
        ? this.indices.items[this.indices.items.length - 1]
        : EmptyAsn.Instance;
    return index instanceof IndexAsn && index.isRangeSubscript();
  }

  getSymbol() {
    const currentScope = updateScope(this.qualifier, this.scope);
    return currentScope.resolveSymbol(this.id, this.scope);
  }

  compileSimpleSubscript(id: string, prefix: string, postfix: string) {
    return compileSimpleSubscript(
      id,
      this.rootSymbolType(),
      this.indices,
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

    if (!isMemberOnFieldsClass(symbol, this.scope)) {
      mustBePublicMember(symbol, this.compileErrors, this.fieldId);
    }

    mustBeKnownSymbol(
      symbol,
      NullScope.Instance,
      symbol.symbolId,
      UnknownType.Instance,
      this.compileErrors,
      this.fieldId,
    );

    if (symbol.symbolScope === SymbolScope.member && isEmptyNode(this.qualifier)) {
      mustBePropertyPrefixedOnMember(this.compileErrors, this.fieldId);
    }

    const prefix = scopePrefix(
      symbol,
      this.qualifier,
      this.compileErrors,
      this.scope,
      this.fieldId,
    );
    const postfix = !isEmptyNode(this.indices) ? this.indices.compile() : "";

    // handles indexing within call statement
    const code = this.rhs
      ? `system.safeSet(${prefix}${this.id}, ${this.rhs}, ${postfix})`
      : this.isSimpleSubscript()
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

    return this.isSimpleSubscript()
      ? getIndexAndOfType(rootType, this.indices.items.length - 1)[1]
      : rootType;
  }

  get symbolScope() {
    return this.getSymbol().symbolScope;
  }

  toString() {
    return `${this.qualifier}${this.id}${this.indices}`;
  }
}
