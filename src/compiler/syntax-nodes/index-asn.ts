import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { SymbolType } from "../../compiler/compiler-interfaces/symbol-type";
import { getGlobalScope } from "../../compiler/symbols/symbol-helpers";
import { UnknownType } from "../../compiler/symbols/unknown-type";
import { getId, mustNotBeNegativeIndex } from "../compile-rules";
import { AbstractAstNode } from "./abstract-ast-node";
import { compileSimpleSubscript, getIndexAndOfType } from "./ast-helpers";
import { UnaryExprAsn } from "./unary-expr-asn";

export class IndexAsn extends AbstractAstNode implements AstNode {
  constructor(
    public readonly index: AstNode,
    public readonly precedingNode: AstNode,
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  // private precedingNode?: AstNode = undefined;

  // updateScopeAndChain(_scope: Scope, ast: AstNode) {
  //   this.precedingNode = ast;
  // }

  get showPreviousNode() {
    return false;
  }

  isAsync: boolean = false;

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
      [this],
      "",
      indexed,
      subscript,
      this.compileErrors,
      this.fieldId,
      this.scope,
    );
  }

  compile(): string {
    this.compileErrors = [];
    const subscript = this.compileSubscript();

    if (!this.precedingNode) {
      return subscript;
    }

    const indexed = this.precedingNode!.compile();
    const indexedType = this.precedingNode!.symbolType();

    const code = this.compileSimpleSubscript(
      getId(this.precedingNode),
      indexedType,
      indexed,
      subscript,
    );

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return code;
  }

  symbolType() {
    if (!this.precedingNode) {
      return UnknownType.Instance;
    }
    const indexedType = this.precedingNode.symbolType();
    const [, ofType] = getIndexAndOfType(indexedType, 0);
    return ofType;
  }

  toString() {
    const pn = this.precedingNode ? `${this.precedingNode}` : "";
    return `${pn}[${this.index}]`;
  }
}
