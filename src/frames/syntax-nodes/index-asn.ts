import { CompileError } from "../compile-error";
import {
  getId,
  mustBeAssignableType,
  mustBeRangeableType,
  mustNotBeNegativeIndex,
} from "../compile-rules";
import { AstNode } from "../interfaces/ast-node";
import { ChainedAsn } from "../interfaces/chained-asn";
import { Scope } from "../interfaces/scope";
import { SymbolType } from "../interfaces/symbol-type";
import { IntType } from "../symbols/int-type";
import { UnknownType } from "../symbols/unknown-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { compileSimpleSubscript, getIndexAndOfType } from "./ast-helpers";
import { OperationSymbol } from "./operation-symbol";
import { RangeAsn } from "./range-asn";
import { UnaryExprAsn } from "./unary-expr-asn";

export class IndexAsn extends AbstractAstNode implements AstNode, ChainedAsn {
  constructor(
    public readonly index: AstNode,
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
    return cc.concat(this.compileErrors).concat(this.index.aggregateCompileErrors());
  }

  isSimpleSubscript() {
    return !(this.index instanceof RangeAsn);
  }

  compileSubscript() {
    return this.index.compile();
  }

  wrapRange(code: string): string {
    return `system.safeSlice(${code})`;
  }

  compileSimpleSubscript(id: string, indexedType: SymbolType, indexed: string, subscript: string) {
    if (this.index instanceof UnaryExprAsn) {
      if (this.index.op === OperationSymbol.Minus) {
        mustNotBeNegativeIndex(this.compileErrors, this.fieldId);
      }
    }

    return compileSimpleSubscript(
      id,
      indexedType,
      this,
      "",
      indexed,
      subscript,
      this.compileErrors,
      this.fieldId,
    );
  }

  compileRange(indexedType: SymbolType, indexed: string, subscript: string) {
    mustBeRangeableType(indexedType, true, this.compileErrors, this.fieldId);
    const [indexType] = getIndexAndOfType(indexedType);
    mustBeAssignableType(indexType, IntType.Instance, this.compileErrors, this.fieldId);
    return this.wrapRange(`${indexed}, ${subscript}`);
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
    return `${pn}[${this.index}]`;
  }
}
