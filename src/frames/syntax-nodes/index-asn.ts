import { CompileError } from "../compile-error";
import {
  mustBeCompatibleType,
  mustBeIndexableSymbol,
  mustBeRangeableSymbol,
} from "../compile-rules";
import { AstNode } from "../interfaces/ast-node";
import { Scope } from "../interfaces/scope";
import { SymbolType } from "../interfaces/symbol-type";
import { ArrayListType } from "../symbols/array-list-type";
import { FunctionType } from "../symbols/function-type";
import { IntType } from "../symbols/int-type";
import { ListType } from "../symbols/list-type";
import { isDictionarySymbolType, isGenericSymbolType } from "../symbols/symbol-helpers";
import { UnknownType } from "../symbols/unknown-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { ChainedAsn } from "./chained-asn";
import { ExprAsn } from "./expr-asn";
import { RangeAsn } from "./range-asn";

export class IndexAsn extends AbstractAstNode implements AstNode, ChainedAsn {
  constructor(
    public readonly index1: ExprAsn,
    public readonly index2: ExprAsn | undefined,
    public readonly fieldId: string,
    scope: Scope,
  ) {
    super();
  }

  private precedingNode?: AstNode = undefined;
  private updatedScope?: Scope = undefined;

  updateScopeAndChain(s: Scope, ast: AstNode) {
    this.updatedScope = s;
    this.precedingNode = ast;
  }

  get showPreviousNode() {
    return false;
  }

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors.concat(this.index1.aggregateCompileErrors());
  }

  isRange() {
    return this.index1 instanceof RangeAsn;
  }

  isIndex() {
    return !(this.index1 instanceof RangeAsn);
  }

  compileIndexParameters() {
    if (this.index1 instanceof RangeAsn || this.index1 instanceof IndexAsn) {
      return `${this.index1.compile()}`;
    }

    return `${this.index1.compile()}`;
  }

  wrapListOrArray(rootType: SymbolType, code: string): string {
    if (rootType instanceof ListType) {
      return `system.immutableList(${code})`;
    }
    if (rootType instanceof ArrayListType) {
      return `system.array(${code})`;
    }
    if (rootType instanceof FunctionType) {
      return this.wrapListOrArray(rootType.returnType, code);
    }
    return code;
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

    let code = `${q}, ${idx}`;

    code = this.wrapIndex(code);

    return code;
  }

  compile(): string {
    this.compileErrors = [];

    if (!this.precedingNode) {
      return this.compileIndexParameters();
    }

    const b = `${this.precedingNode!.compile()}`;
    const idx = this.compileIndexParameters();
    let code = `${b}`;

    if (this.isIndex() || this.isRange()) {
      const rootType = this.precedingNode!.symbolType();

      if (this.isIndex()) {
        code = this.compileIndex(rootType, this, code, idx);
      }
      if (this.isRange()) {
        mustBeRangeableSymbol(rootType, true, this.compileErrors, this.fieldId);
        const [indexType] = this.getIndexType(rootType);
        mustBeCompatibleType(indexType, IntType.Instance, this.compileErrors, this.fieldId);
        code = `${code}${idx}`;
        code = this.wrapListOrArray(rootType, code);
      }
    }

    return code;
  }

  symbolType() {
    if (!this.precedingNode) {
      return UnknownType.Instance;
    }

    const rootType = this.precedingNode.symbolType();

    if (this.isIndex()) {
      const [, ofType] = this.getIndexType(rootType);
      return ofType;
    }

    return rootType;
  }

  toString() {
    if (this.index2) {
      return `[${this.index1}][${this.index2}]`;
    }
    return `[${this.index1}]`;
  }
}
