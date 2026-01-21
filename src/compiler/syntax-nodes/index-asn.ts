import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { ChainedAsn } from "../../compiler/compiler-interfaces/chained-asn";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { SymbolType } from "../../compiler/compiler-interfaces/symbol-type";
import { getGlobalScope } from "../../compiler/symbols/symbol-helpers";
import { UnknownType } from "../../compiler/symbols/unknown-type";
import {
  getId,
  mustBeAssignableType,
  mustBeRangeableType,
  mustNotBeNegativeIndex,
} from "../compile-rules";
import { AbstractAstNode } from "./abstract-ast-node";
import { compileSimpleSubscript, getIndexAndOfType } from "./ast-helpers";
import { RangeAsn } from "./range-asn";
import { UnaryExprAsn } from "./unary-expr-asn";

export class IndexAsn extends AbstractAstNode implements AstNode, ChainedAsn {
  constructor(
    public readonly index: AstNode,
    public readonly fieldId: string,
    private readonly scope: Scope,
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

  isSimpleSubscript() {
    return !(this.index instanceof RangeAsn);
  }

  isRangeSubscript() {
    return this.index instanceof RangeAsn;
  }

  compileSubscript() {
    return this.index.compile();
  }

  wrapRange(code: string): string {
    return `system.safeSlice(${code})`;
  }

  compileSimpleSubscript(id: string, indexedType: SymbolType, indexed: string, subscript: string) {
    if (this.index instanceof UnaryExprAsn) {
      if (this.index.isNegativeOperation()) {
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
    mustBeAssignableType(
      indexType,
      (this.index as RangeAsn).from.symbolType(),
      this.compileErrors,
      this.fieldId,
    );
    mustBeAssignableType(
      indexType,
      (this.index as RangeAsn).to.symbolType(),
      this.compileErrors,
      this.fieldId,
    );
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

    const code = this.isSimpleSubscript()
      ? this.compileSimpleSubscript(getId(this.precedingNode), indexedType, indexed, subscript)
      : this.compileRange(indexedType, indexed, subscript);

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return code;
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
