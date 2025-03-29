import { CompileError } from "../compile-error";
import { mustNotBeNegativeIndex } from "../compile-rules";
import { AstNode } from "../interfaces/ast-node";
import { UnknownType } from "../symbols/unknown-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { isEmptyNode } from "./ast-helpers";
import { OperationSymbol } from "./operation-symbol";
import { UnaryExprAsn } from "./unary-expr-asn";

export class RangeAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly from: AstNode,
    private readonly to: AstNode,
    public readonly fieldId: string,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    const fr = this.from.aggregateCompileErrors();
    const to = this.to.aggregateCompileErrors();

    return this.compileErrors.concat(fr).concat(to);
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

    this.checkForNegativeIndex(this.from);
    this.checkForNegativeIndex(this.to);

    const f = !isEmptyNode(this.from) ? `${this.from.compile()}` : "0";
    const t = !isEmptyNode(this.to) ? `${this.to.compile()}` : undefined;
    return t ? `${f}, ${t}` : `${f}`;
  }

  symbolType() {
    return UnknownType.Instance;
  }

  toString() {
    return `${this.from}..${this.to}`;
  }
}
