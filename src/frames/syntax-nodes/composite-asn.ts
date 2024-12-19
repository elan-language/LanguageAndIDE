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

  private finalNode?: AstNode;

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

    for (let i = 0; i < leafNodes.length; i++) {
      const currentNode = leafNodes[i];

      currentNode.updateScopeAndChain(previousScope, previousNode);

      const currentCode = currentNode.compile();

      if (!currentNode.showPreviousNode) {
        code = [];
      } else {
        if (previousCode) {
          const async = currentNode.isAsync ? "await " : "";
          code.push(`${async}${previousCode}`);
        }
      }

      previousNode = new CompositeAsn(
        previousNode,
        new CsvAsn([currentNode], this.fieldId),
        this.fieldId,
        this.scope,
      );
      previousCode = currentCode;
      previousScope = updateScopeInChain(currentNode, transforms(), this.scope);

      // last node in chain
      if (i === leafNodes.length - 1) {
        code.push(previousCode);
        this.finalNode = currentNode;
      }
    }

    return code.join(".");
  }

  symbolType() {
    this.compile();
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
