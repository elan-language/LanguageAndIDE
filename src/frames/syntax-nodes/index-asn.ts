import { CompileError } from "../compile-error";
import {
  getId,
  mustBeAssignableType,
  mustBeIndexableType,
  mustBeRangeableType,
  mustNotBeNegativeIndex,
} from "../compile-rules";
import { AstNode } from "../interfaces/ast-node";
import { Scope } from "../interfaces/scope";
import { SymbolType } from "../interfaces/symbol-type";
import { ArrayType } from "../symbols/array-type";
import { IntType } from "../symbols/int-type";
import { ListType } from "../symbols/list-type";
import { UnknownType } from "../symbols/unknown-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { getIndexAndOfType } from "./ast-helpers";
import { ChainedAsn } from "./chained-asn";
import { OperationSymbol } from "./operation-symbol";
import { RangeAsn } from "./range-asn";
import { UnaryExprAsn } from "./unary-expr-asn";

export class IndexAsn extends AbstractAstNode implements AstNode, ChainedAsn {
  constructor(
    public readonly subscript: AstNode,
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
    return cc.concat(this.compileErrors).concat(this.subscript.aggregateCompileErrors());
  }

  isRange() {
    return this.subscript instanceof RangeAsn;
  }

  isSimpleSubscript() {
    return !(this.subscript instanceof RangeAsn);
  }

  compileSubscript() {
    if (this.subscript instanceof UnaryExprAsn) {
      if (this.subscript.op === OperationSymbol.Minus) {
        mustNotBeNegativeIndex(this.compileErrors, this.fieldId);
      }
    }

    return this.subscript.compile();
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

  wrapSimpleSubscript(code: string): string {
    return `system.safeIndex(${code})`;
  }

  wrapRange(code: string): string {
    return `system.safeSlice(${code})`;
  }

  compileSimpleSubscript(id: string, indexedType: SymbolType, indexed: string, subscript: string) {
    mustBeIndexableType(id, indexedType, true, this.compileErrors, this.fieldId);
    const [indexType] = getIndexAndOfType(indexedType);
    mustBeAssignableType(indexType, this.subscript.symbolType(), this.compileErrors, this.fieldId);
    return this.wrapSimpleSubscript(`${indexed}, ${subscript}`);
  }

  compileRange(indexedType: SymbolType, indexed: string, subscript: string) {
    mustBeRangeableType(indexedType, true, this.compileErrors, this.fieldId);
    const [indexType] = getIndexAndOfType(indexedType);
    mustBeAssignableType(indexType, IntType.Instance, this.compileErrors, this.fieldId);
    return this.wrapListOrArray(indexedType, this.wrapRange(`${indexed}, ${subscript}`));
  }

  compile(): string {
    this.compileErrors = [];
    const subscript = this.compileSubscript();

    if (!this.precedingNode) {
      return subscript;
    }

    const indexed = this.precedingNode!.compile();
    const indexedType = this.precedingNode!.symbolType();

    return this.isSimpleSubscript()
      ? this.compileSimpleSubscript(getId(this.precedingNode), indexedType, indexed, subscript)
      : this.compileRange(indexedType, indexed, subscript);
  }

  symbolType() {
    if (!this.precedingNode) {
      return UnknownType.Instance;
    }

    const indexedType = this.precedingNode.symbolType();

    if (this.isSimpleSubscript()) {
      const [, ofType] = getIndexAndOfType(indexedType);
      return ofType;
    }

    return indexedType;
  }

  toString() {
    const pn = this.precedingNode ? `${this.precedingNode}` : "";
    return `${pn}[${this.subscript}]`;
  }
}
