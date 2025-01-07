import { CompileError } from "../compile-error";
import {
  getId,
  mustBeCompatibleType,
  mustBeIndexableSymbol,
  mustBeRangeableSymbol,
} from "../compile-rules";
import { AstNode } from "../interfaces/ast-node";
import { Scope } from "../interfaces/scope";
import { SymbolType } from "../interfaces/symbol-type";
import { ArrayType } from "../symbols/array-type";
import { IntType } from "../symbols/int-type";
import { ListType } from "../symbols/list-type";
import { isAnyDictionaryType, isGenericSymbolType } from "../symbols/symbol-helpers";
import { UnknownType } from "../symbols/unknown-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { ChainedAsn } from "./chained-asn";
import { RangeAsn } from "./range-asn";

export class IndexAsn extends AbstractAstNode implements AstNode, ChainedAsn {
  constructor(
    public readonly index1: AstNode,
    public readonly index2: AstNode | undefined,
    public readonly fieldId: string,
  ) {
    super();
  }

  private precedingNode?: AstNode = undefined;

  updateScopeAndChain(_scope: Scope, ast: AstNode) {
    this.precedingNode = ast;
  }

  get showPreviousNode() {
    return false;
  }

  isAsync: boolean = false;

  aggregateCompileErrors(): CompileError[] {
    const cc = this.precedingNode?.aggregateCompileErrors() ?? [];
    return cc.concat(this.compileErrors).concat(this.index1.aggregateCompileErrors());
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
      return `system.list(${code})`;
    }
    if (rootType instanceof ArrayType) {
      return `system.array(${code})`;
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
    if (isAnyDictionaryType(rootType)) {
      return [rootType.keyType, rootType.valueType];
    }
    return [UnknownType.Instance, UnknownType.Instance];
  }

  compileIndex(id: string, rootType: SymbolType, index: IndexAsn, q: string, idx: string) {
    mustBeIndexableSymbol(id, rootType, true, this.compileErrors, this.fieldId);
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
        code = this.compileIndex(getId(this.precedingNode), rootType, this, code, idx);
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
    const pn = this.precedingNode ? `${this.precedingNode}` : "";
    return `${pn}[${this.index1}]`;
  }
}
