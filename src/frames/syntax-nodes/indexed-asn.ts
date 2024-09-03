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
import { ImmutableListType } from "../symbols/immutable-list-type";
import { IntType } from "../symbols/int-type";
import { isDictionarySymbolType, isGenericSymbolType } from "../symbols/symbol-helpers";
import { UnknownType } from "../symbols/unknown-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { isAstChainedNode } from "./ast-helpers";
import { ChainedAsn } from "./chained-asn";
import { ExprAsn } from "./expr-asn";
import { IndexAsn } from "./index-asn";
import { RangeAsn } from "./range-asn";

export class IndexedAsn extends AbstractAstNode implements ChainedAsn {
  constructor(
    private readonly body: ExprAsn,
    private readonly index: IndexAsn | undefined,
    public readonly fieldId: string,
    private scope: Scope,
  ) {
    super();
  }

  private precedingNode?: AstNode = undefined;

  updateScopeAndChain(s: Scope, ast: AstNode) {
    this.scope = s;
    this.precedingNode = ast;

    if (isAstChainedNode(this.body)) {
      this.body.updateScopeAndChain(s, ast);
    }
  }

  get showPreviousNode() {
    const indexed = !!this.index;
    if (isAstChainedNode(this.body)) {
      this.body.compile(); // todo make this not necessary
      return this.body.showPreviousNode && !indexed;
    }
    return !indexed;
  }

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors.concat(this.body.aggregateCompileErrors());
  }

  isRange() {
    return this.index instanceof IndexAsn && this.index.index1 instanceof RangeAsn;
  }

  isIndex() {
    return this.index instanceof IndexAsn && !(this.index.index1 instanceof RangeAsn);
  }

  isDoubleIndex() {
    return this.isIndex() && this.index!.isDoubleIndex();
  }

  wrapListOrArray(rootType: SymbolType, code: string): string {
    if (rootType instanceof ImmutableListType) {
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
    if (this.isDoubleIndex()) {
      return `system.safeDoubleIndex(${code})`;
    }
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
    if (this.isDoubleIndex()) {
      const [indexType, ofType] = this.getIndexType(rootType);

      mustBeIndexableSymbol(ofType, true, this.compileErrors, this.fieldId);
      mustBeCompatibleType(indexType, index.index1.symbolType(), this.compileErrors, this.fieldId);

      const [indexType1] = this.getIndexType(ofType);

      mustBeCompatibleType(
        indexType1,
        index.index2!.symbolType(),
        this.compileErrors,
        this.fieldId,
      );
    } else {
      mustBeIndexableSymbol(rootType, true, this.compileErrors, this.fieldId);
      const [indexType] = this.getIndexType(rootType);
      mustBeCompatibleType(indexType, index.index1.symbolType(), this.compileErrors, this.fieldId);
    }

    let code = `${q}, ${idx}`;

    code = this.wrapIndex(code);

    return code;
  }

  compile(): string {
    this.compileErrors = [];

    const b = `${this.body.compile()}`;
    const idx = this.index ? this.index.compile() : "";
    let code = `${b}`;

    if (this.isIndex() || this.isRange()) {
      if (this.precedingNode && isAstChainedNode(this.body) && this.body.showPreviousNode) {
        code = `${this.precedingNode.compile()}.${code}`;
      }

      const rootType = this.body.symbolType();

      if (this.isIndex()) {
        code = this.compileIndex(rootType, this.index!, code, idx);
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
    const rootType = this.body.symbolType();

    if (this.isIndex()) {
      const [, ofType] = this.getIndexType(rootType);
      return ofType;
    }

    return rootType;
  }

  toString() {
    return `${this.body}`;
  }
}
