import { mustNotBeNegativeIndex } from "../compile-rules";
import { AstNode } from "../compiler-interfaces/ast-node";
import { Scope } from "../compiler-interfaces/scope";
import { getGlobalScope } from "../symbols/symbol-helpers";
import { UnknownType } from "../symbols/unknown-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { OperationSymbol } from "./operation-symbol";
import { UnaryExprAsn } from "./unary-expr-asn";

export class IndexDoubleAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly index1: AstNode,
    private readonly index2: AstNode,
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  checkForNegativeIndex(index: AstNode) {
    if (index instanceof UnaryExprAsn) {
      if (index.op === OperationSymbol.Minus) {
        mustNotBeNegativeIndex(this.compileErrors, this.fieldId);
      }
    }
  }

  compile(): string {
    this.compileErrors = [];

    this.checkForNegativeIndex(this.index1);
    this.checkForNegativeIndex(this.index2);

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    return `${this.index1.compile()}, ${this.index2.compile()}`;
  }

  symbolType() {
    return UnknownType.Instance;
  }

  toString() {
    return `${this.index1}..${this.index2}`;
  }
}
