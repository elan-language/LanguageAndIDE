import { CompileError } from "../compile-error";
import { AstNode } from "../interfaces/ast-node";
import { Scope } from "../interfaces/scope";
import { updateScopeInChain } from "../symbols/symbol-helpers";
import { AbstractAstNode } from "./abstract-ast-node";
import { transforms } from "./ast-helpers";
import { ChainedAsn } from "./chained-asn";
import { CsvAsn } from "./csv-asn";
import { ExprAsn } from "./expr-asn";

export class CompositeAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly expr1: ExprAsn,
    private readonly expr2: ExprAsn,
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors
      .concat(this.expr1.aggregateCompileErrors())
      .concat(this.expr2.aggregateCompileErrors());
  }

  compile(): string {
    this.compileErrors = [];

    let code: string[] = [];

    const leafNodes = (this.expr2 as CsvAsn).items as ChainedAsn[];

    let previousNode = this.expr1;
    let previousScope = updateScopeInChain(previousNode, transforms(), this.scope);
    let previousCode = previousNode.compile();

    if (previousCode) {
      code.push(previousCode);
    }

    for (let i = 0; i < leafNodes.length; i++) {
      const currentNode = leafNodes[i];

      currentNode.updateScopeAndChain(previousScope, previousNode);

      const currentCode = currentNode.compile();

      if (!currentNode.showPreviousNode) {
        code = [];
      }

      previousNode = new CompositeAsn(
        previousNode,
        new CsvAsn([currentNode], this.fieldId, this.scope),
        this.fieldId,
        this.scope,
      );
      previousCode = currentCode;
      previousScope = updateScopeInChain(currentNode, transforms(), this.scope);

      // last node in chain
      if (i === leafNodes.length - 1) {
        code.push(previousCode);
      }
    }

    return code.join(".");
  }

  symbolType() {
    const leafNodes = (this.expr2 as CsvAsn).items as ChainedAsn[];
    const node2 = leafNodes[0];

    const scope = updateScopeInChain(this.expr1, transforms(), this.scope);
    node2.updateScopeAndChain(scope, this.expr1);

    return node2.symbolType();
  }

  toString() {
    const ss: string[] = [`${this.expr1}`];

    const leafNodes = (this.expr2 as CsvAsn).items as ChainedAsn[];

    for (const ln of leafNodes) {
      ss.push(`${ln}`);
    }

    return ss.join(".");
  }
}
