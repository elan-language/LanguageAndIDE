import { CompileError } from "../compile-error";
import { AstNode } from "../interfaces/ast-node";
import { Scope } from "../interfaces/scope";
import { updateScopeInChain } from "../symbols/symbol-helpers";
import { UnknownType } from "../symbols/unknown-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { transforms } from "./ast-helpers";
import { ChainedAsn } from "./chained-asn";
import { CsvAsn } from "./csv-asn";

export class CompositeAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly expr1: AstNode,
    private readonly expr2: AstNode,
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  private finalNode?: ChainedAsn;

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors
      .concat(this.expr1.aggregateCompileErrors())
      .concat(this.expr2.aggregateCompileErrors());
  }

  setupNodes() {
    const leafNodes = (this.expr2 as CsvAsn).items as ChainedAsn[];

    if (!this.finalNode) {
      let previousNode = this.expr1;
      let previousScope = updateScopeInChain(previousNode, transforms(), this.scope);

      for (let i = 0; i < leafNodes.length; i++) {
        const currentNode = leafNodes[i];

        currentNode.updateScopeAndChain(previousScope, previousNode);

        previousNode = new CompositeAsn(
          previousNode,
          new CsvAsn([currentNode], this.fieldId),
          this.fieldId,
          this.scope,
        );

        previousScope = updateScopeInChain(currentNode, transforms(), this.scope);

        // last node in chain
        if (i === leafNodes.length - 1) {
          this.finalNode = currentNode;
        }
      }
    }

    return leafNodes;
  }

  compile(): string {
    this.compileErrors = [];

    let code: string[] = [];

    const leafNodes = this.setupNodes();
    let previousCode = this.expr1.compile();

    for (const currentNode of leafNodes) {
      const currentCode = currentNode.compile();

      if (currentNode.showPreviousNode) {
        code.push(`${previousCode}`);
      } else {
        // if any node doesn't show previous code clear everything
        code = [];
      }

      previousCode = currentCode;

      // last node in chain
      if (currentNode === this.finalNode) {
        code.push(previousCode);
      }
    }

    const showAwait = this.finalNode!.isAsync && this.finalNode?.showPreviousNode;
    const isAsyncStart = showAwait ? "(await " : "";
    const isAsyncEnd = showAwait ? ")" : "";

    return `${isAsyncStart}${code.join(".")}${isAsyncEnd}`;
  }

  symbolType() {
    this.setupNodes();
    return this.finalNode?.symbolType() ?? UnknownType.Instance;
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
