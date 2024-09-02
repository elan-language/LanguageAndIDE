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

    const leafNodes = (this.expr2 as CsvAsn).items as ChainedAsn[];
    const node2 = leafNodes[0];

    const scope = updateScopeInChain(this.expr1, transforms(), this.scope);

    let e1 = this.expr1.compile();

    node2.updateScopeAndChain(scope, this.expr1);
    const e2 = node2.compile();
    e1 = e1 && node2.showPreviousNode ? `${e1}.` : "";

    return `${e1}${e2}`;
  }

  symbolType() {
    const leafNodes = (this.expr2 as CsvAsn).items as ChainedAsn[];
    const node2 = leafNodes[0];

    const scope = updateScopeInChain(this.expr1, transforms(), this.scope);
    node2.updateScopeAndChain(scope, this.expr1);

    return node2.symbolType();
  }

  toString() {
    return `${this.expr1}.${this.expr2}`;
  }
}
