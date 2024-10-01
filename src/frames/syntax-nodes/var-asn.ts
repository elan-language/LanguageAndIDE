import { CompileError } from "../compile-error";
import {
  mustBeCompatibleType,
  mustBeIndexableSymbol,
  mustBeKnownSymbol,
  mustBePublicMember,
} from "../compile-rules";
import { isScope } from "../helpers";
import { AstIndexableNode } from "../interfaces/ast-indexable-node";
import { AstQualifierNode } from "../interfaces/ast-qualifier-node";
import { ElanSymbol } from "../interfaces/elan-symbol";
import { Frame } from "../interfaces/frame";
import { Scope } from "../interfaces/scope";
import { SymbolType } from "../interfaces/symbol-type";
import { globalKeyword } from "../keywords";
import { AbstractDictionaryType } from "../symbols/abstract-dictionary-type";
import { ArrayType } from "../symbols/array-list-type";
import { ClassType } from "../symbols/class-type";
import { IntType } from "../symbols/int-type";
import { ListType } from "../symbols/list-type";
import {
  getClassScope,
  getGlobalScope,
  isDictionarySymbolType,
  isGenericSymbolType,
  isMemberOnFieldsClass,
  scopePrefix,
} from "../symbols/symbol-helpers";
import { SymbolScope } from "../symbols/symbol-scope";
import { UnknownSymbol } from "../symbols/unknown-symbol";
import { UnknownType } from "../symbols/unknown-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { isAstIdNode, transforms } from "./ast-helpers";
import { IndexAsn } from "./index-asn";
import { QualifierAsn } from "./qualifier-asn";
import { RangeAsn } from "./range-asn";
import { ThisAsn } from "./this-asn";

export class VarAsn extends AbstractAstNode implements AstIndexableNode {
  constructor(
    public readonly id: string,
    public readonly isAssignable: boolean,
    public readonly qualifier: AstQualifierNode | undefined,
    private readonly index: IndexAsn | undefined,
    public readonly fieldId: string,
    private scope: Scope,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    const q = this.qualifier ? this.qualifier.aggregateCompileErrors() : [];
    const i = this.index ? this.index.aggregateCompileErrors() : [];

    return this.compileErrors.concat(q).concat(i);
  }

  isIndex() {
    return this.index instanceof IndexAsn && !(this.index.index1 instanceof RangeAsn);
  }

  wrapIndex(code: string): string {
    return `system.safeIndex(${code})`;
  }

  getIndexType(rootType: SymbolType): [SymbolType, SymbolType] {
    if (isGenericSymbolType(rootType)) {
      return [IntType.Instance, rootType.ofType];
    }
    if (isDictionarySymbolType(rootType)) {
      return [rootType.keyType, rootType.valueType];
    }
    return [UnknownType.Instance, UnknownType.Instance];
  }

  compileIndex(rootType: SymbolType, index: IndexAsn, q: string, idx: string) {
    mustBeIndexableSymbol(rootType, true, this.compileErrors, this.fieldId);
    const [indexType] = this.getIndexType(rootType);
    mustBeCompatibleType(indexType, index.index1.symbolType(), this.compileErrors, this.fieldId);

    let code = `${q}${this.id}, ${idx}`;
    if (!this.isAssignable) {
      code = this.wrapIndex(code);
    }
    return code;
  }

  updateScope() {
    let currentScope: Scope;
    const classScope = this.qualifier ? this.qualifier.symbolType() : undefined;
    if (classScope instanceof ClassType) {
      const classSymbol = this.scope.resolveSymbol(classScope.className, transforms(), this.scope);
      // replace scope with class scope
      currentScope = isScope(classSymbol) ? classSymbol : this.scope;
    } else {
      currentScope = this.scope.getParentScope();
    }

    return currentScope;
  }

  compile(): string {
    this.compileErrors = [];
    let symbol: ElanSymbol = new UnknownSymbol(this.id);

    const classScope = this.qualifier ? this.qualifier.symbolType() : undefined;
    if (classScope instanceof ClassType) {
      const classSymbol = this.scope.resolveSymbol(classScope.className, transforms(), this.scope);
      if (isScope(classSymbol)) {
        symbol = classSymbol.resolveSymbol(this.id, transforms(), classSymbol);
      }
    } else {
      symbol = this.scope.getParentScope().resolveSymbol(this.id, transforms(), this.scope);
    }

    if (!isMemberOnFieldsClass(symbol, transforms(), this.scope)) {
      mustBePublicMember(symbol, this.compileErrors, this.fieldId);
    }

    mustBeKnownSymbol(symbol, this.compileErrors, this.fieldId);

    const q = scopePrefix(symbol, this.compileErrors, this.scope, this.fieldId);
    const idx = this.index
      ? this.index.compile()
      : symbol.symbolScope === SymbolScope.outParameter
        ? "[0]"
        : "";

    let code = `${q}${this.id}${idx}`;

    if (this.isIndex()) {
      const rootType = this.scope
        .resolveSymbol(this.id, transforms(), this.scope)
        .symbolType(transforms());

      code = this.compileIndex(rootType, this.index!, q, idx);
    }

    return code;
  }

  rootSymbolType() {
    const currentScope = this.updateScope();
    const rootType = currentScope
      .resolveSymbol(this.id, transforms(), this.scope)
      .symbolType(transforms());
    return rootType;
  }

  getOfType(rootType: SymbolType) {
    if (rootType instanceof ListType || rootType instanceof ArrayType) {
      return rootType.ofType;
    }

    if (rootType instanceof AbstractDictionaryType) {
      return rootType.valueType;
    }

    return UnknownType.Instance;
  }

  symbolType() {
    const rootType = this.rootSymbolType();
    if (this.isIndex()) {
      return this.getOfType(rootType);
    }
    return rootType;
  }

  get symbolScope() {
    const currentScope = this.updateScope();
    const symbol = currentScope.resolveSymbol(this.id, transforms(), this.scope);
    return symbol.symbolScope;
  }

  toString() {
    const q = this.qualifier ? `${this.qualifier}` : "";
    const idx = this.index ? `${this.index}` : "";
    return `${q}${this.id}${idx}`;
  }
}
