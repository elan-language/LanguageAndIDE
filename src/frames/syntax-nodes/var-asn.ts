import { CompileError } from "../compile-error";
import {
  mustBeAssignableType,
  mustBeIndexableSymbol,
  mustBeKnownSymbol,
  mustBePropertyPrefixedOnMember,
  mustBePublicMember,
} from "../compile-rules";
import { AstIndexableNode } from "../interfaces/ast-indexable-node";
import { AstQualifierNode } from "../interfaces/ast-qualifier-node";
import { Scope } from "../interfaces/scope";
import { SymbolType } from "../interfaces/symbol-type";
import { IntType } from "../symbols/int-type";
import { NullScope } from "../symbols/null-scope";
import {
  isAnyDictionaryType,
  isDeconstructedType,
  isGenericSymbolType,
  isMemberOnFieldsClass,
  scopePrefix,
  updateScope,
} from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { UnknownType } from "../symbols/unknown-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { isEmptyNode, transforms } from "./ast-helpers";
import { EmptyAsn } from "./empty-asn";
import { IndexAsn } from "./index-asn";
import { RangeAsn } from "./range-asn";

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

  aggregateCompileErrors(): CompileError[] {
    const q = this.qualifier.aggregateCompileErrors();
    const i = this.index.aggregateCompileErrors();

    return this.compileErrors.concat(q).concat(i);
  }

  isIndex() {
    return this.index instanceof IndexAsn && !(this.index.index1 instanceof RangeAsn);
  }

  getIndexAndOfType(rootType: SymbolType): [SymbolType, SymbolType] {
    if (isGenericSymbolType(rootType)) {
      return [IntType.Instance, rootType.ofType];
    }

    if (isAnyDictionaryType(rootType)) {
      return [rootType.keyType, rootType.valueType];
    }

    return [UnknownType.Instance, UnknownType.Instance];
  }

  compileIndex(id: string, rootType: SymbolType, index: IndexAsn, prefix: string, postfix: string) {
    mustBeIndexableSymbol(id, rootType, true, this.compileErrors, this.fieldId);
    const [indexType] = this.getIndexAndOfType(rootType);
    mustBeAssignableType(indexType, index.index1.symbolType(), this.compileErrors, this.fieldId);

    const code = `${prefix}${this.id}, ${postfix}`;
    return `system.safeIndex(${code})`;
  }

  getSymbol() {
    const currentScope = updateScope(this.qualifier, this.scope);
    return currentScope.resolveSymbol(this.id, transforms(), this.scope);
  }

  compile(): string {
    this.compileErrors = [];

    const symbol = this.getSymbol();

    if (!isMemberOnFieldsClass(symbol, transforms(), this.scope)) {
      mustBePublicMember(symbol, this.compileErrors, this.fieldId);
    }

    mustBeKnownSymbol(symbol, NullScope.Instance, this.compileErrors, this.fieldId);

    if (symbol.symbolScope === SymbolScope.member && isEmptyNode(this.qualifier)) {
      mustBePropertyPrefixedOnMember(this.compileErrors, this.fieldId);
    }

    const prefix = scopePrefix(symbol, this.compileErrors, this.scope, this.fieldId);
    const postfix = !isEmptyNode(this.index)
      ? this.index.compile()
      : symbol.symbolScope === SymbolScope.outParameter
        ? "[0]"
        : "";

    return this.isIndex()
      ? this.compileIndex(
          symbol.symbolId,
          this.rootSymbolType(),
          this.index as IndexAsn,
          prefix,
          postfix,
        )
      : `${prefix}${this.id}${postfix}`;
  }

  rootSymbolType() {
    return this.getSymbol().symbolType(transforms());
  }

  symbolType() {
    const rootType = this.rootSymbolType();

    if (isDeconstructedType(rootType)) {
      return rootType.symbolTypeFor(this.id);
    }

    return this.isIndex() ? this.getIndexAndOfType(rootType)[1] : rootType;
  }

  get symbolScope() {
    return this.getSymbol().symbolScope;
  }

  toString() {
    return `${this.qualifier}${this.id}${this.index}`;
  }
}
