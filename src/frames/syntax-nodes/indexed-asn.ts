import { CompileError } from "../compile-error";
import { AstNode } from "../interfaces/ast-node";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { isAstChainedNode } from "./ast-helpers";
import { ChainedAsn } from "./chained-asn";
import { ExprAsn } from "./expr-asn";

export class IndexedAsn extends AbstractAstNode implements ChainedAsn {
  constructor(
    private readonly body: ExprAsn,
    public readonly fieldId: string,
    private scope: Scope,
  ) {
    super();
  }

  updateScopeAndChain(s: Scope, ast: AstNode) {
    if (isAstChainedNode(this.body)) {
      this.body.updateScopeAndChain(s, ast);
    }
  }

  get showPreviousNode() {
    return true;
  }

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors.concat(this.body.aggregateCompileErrors());
  }

  compile(): string {
    this.compileErrors = [];
    return `${this.body.compile()}`;
  }

  symbolType() {
    const rootType = this.body.symbolType();

    return rootType;
  }

  toString() {
    return `${this.body}`;
  }
}
