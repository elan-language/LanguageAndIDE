import {
  mustBeAssignableType,
  mustBeIndexableType,
  mustBeKnownSymbol,
  mustBePropertyPrefixedOnMember,
  mustBePublicMember,
} from "../compile-rules";
import { AstIndexableNode } from "../compiler-interfaces/ast-indexable-node";
import { AstNode } from "../compiler-interfaces/ast-node";
import { AstQualifierNode } from "../compiler-interfaces/ast-qualifier-node";
import { ElanSymbol } from "../compiler-interfaces/elan-symbol";
import { Scope } from "../compiler-interfaces/scope";
import { NullScope } from "../symbols/null-scope";
import {
  getGlobalScope,
  isMemberOnFieldsClass,
  scopePrefix,
  updateScope,
} from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { UnknownType } from "../symbols/unknown-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { compileSimpleSubscript, getIndexAndOfType, isAstIdNode, isEmptyNode } from "./ast-helpers";
import { EmptyAsn } from "./empty-asn";
import { IndexAsn } from "./index-asn";

export class AssignableAsn extends AbstractAstNode implements AstIndexableNode {
  constructor(
    public readonly idNode: AstNode,
    public readonly qualifier: AstQualifierNode | EmptyAsn,
    public indices: AstNode[],
    public readonly fieldId: string,
    private scope: Scope,
  ) {
    super();
  }

  get id() {
    return isAstIdNode(this.idNode) ? this.idNode.id : "";
  }

  private rhs?: string;

  setRHS(code: string) {
    this.rhs = code;
  }

  isSimpleSubscript() {
    const index =
      this.indices.length > 0 ? this.indices[this.indices.length - 1] : EmptyAsn.Instance;
    return index instanceof IndexAsn;
  }

  getSymbol() {
    const currentScope = updateScope(this.qualifier, this.scope);
    return currentScope.resolveSymbol(this.id, true, this.scope);
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
      this.scope,
    );
  }

  compileAssignSubscript(symbol: ElanSymbol, prefix: string, postfix: string) {
    const index = this.indices[this.indices.length - 1] as IndexAsn;
    const [indexType] = getIndexAndOfType(this.rootSymbolType(), this.indices.length - 1);
    mustBeIndexableType(
      symbol.symbolId,
      this.rootSymbolType(),
      true,
      this.compileErrors,
      this.fieldId,
      this.scope,
    );
    mustBeAssignableType(
      indexType,
      index.index.symbolType(),
      this.compileErrors,
      this.fieldId,
      this.scope,
    );

    return `system.safeSet(${prefix}${this.id}, ${this.rhs}, [${postfix}])`;
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
      this.scope,
    );

    if (symbol.symbolScope === SymbolScope.member && isEmptyNode(this.qualifier)) {
      mustBePropertyPrefixedOnMember(this.scope, this.compileErrors, this.fieldId);
    }

    const prefix = scopePrefix(
      symbol,
      this.qualifier,
      this.compileErrors,
      this.scope,
      this.fieldId,
    );

    const postfix = `${this.indices.map((i) => i.compile()).join(", ")}`;

    // handles indexing within call statement

    const code = this.rhs
      ? this.compileAssignSubscript(symbol, prefix, postfix)
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
      ? getIndexAndOfType(rootType, this.indices.length - 1)[1]
      : rootType;
  }

  get symbolScope() {
    return this.getSymbol().symbolScope;
  }

  toString() {
    return `${this.qualifier}${this.id}${this.indices}`;
  }
}
