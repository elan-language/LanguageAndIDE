import { compilerAssert } from "../compile-rules";
import { AstCollectionNode } from "../compiler-interfaces/ast-collection-node";
import { AstNode } from "../compiler-interfaces/ast-node";
import { ChainedAsn } from "../compiler-interfaces/chained-asn";
import { Scope } from "../compiler-interfaces/scope";
import { updateScopeInChain } from "../symbols/symbol-helpers";
import { UnknownType } from "../symbols/unknown-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { CsvAsn } from "./csv-asn";

export class CompositeAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly expr1: AstNode,
    private readonly expr2: AstCollectionNode,
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  private finalNode?: ChainedAsn;

  setupNodes() {
    const leafNodes = this.expr2.items as ChainedAsn[];

    compilerAssert(leafNodes.length > 0, "No leaf nodes");

    if (!this.finalNode) {
      let previousNode = this.expr1;
      let previousScope = updateScopeInChain(previousNode, this.scope);

      for (let i = 0; i < leafNodes.length; i++) {
        const currentNode = leafNodes[i];

        currentNode.updateScopeAndChain(previousScope, previousNode);

        previousNode = new CompositeAsn(
          previousNode,
          new CsvAsn([currentNode], this.fieldId),
          this.fieldId,
          this.scope,
        );

        previousScope = updateScopeInChain(currentNode, this.scope);

        // last node in chain
        if (i === leafNodes.length - 1) {
          this.finalNode = currentNode;
        }
      }
    }

    return leafNodes;
  }

  nestedAsyncs(depth: number): string {
    return depth > 0 ? `(await ${this.nestedAsyncs(--depth)}` : "";
  }

  compile(): string {
    this.compileErrors = [];

    let code: string[] = [];

    const leafNodes = this.setupNodes();
    let previousCode = this.expr1.compile();
    let asyncCount = 0;

    for (let i = 0; i < leafNodes.length; i++) {
      const currentNode = leafNodes[i];

      let currentCode = currentNode.compile();

      if (currentNode.showPreviousNode) {
        code.push(`${previousCode}`);
        if (currentNode.isAsync) {
          asyncCount++;
          currentCode = currentCode + ")";
        }
      } else {
        // if any node doesn't show previous code clear everything
        code = [];
        asyncCount = 0;
      }

      previousCode = currentCode;

      // last node in chain
      if (currentNode === this.finalNode) {
        code.push(previousCode);
      }
    }

    const showAwait = asyncCount > 0;
    const isAsyncStart = showAwait ? this.nestedAsyncs(asyncCount) : "";

    return `${isAsyncStart}${code.join(".")}`;
  }

  symbolType() {
    this.setupNodes();
    return this.finalNode?.symbolType() ?? UnknownType.Instance;
  }

  toString() {
    const ss: string[] = [`${this.expr1}`];

    const leafNodes = this.expr2.items;

    for (const ln of leafNodes) {
      ss.push(`${ln}`);
    }

    return ss.join(".");
  }
}
