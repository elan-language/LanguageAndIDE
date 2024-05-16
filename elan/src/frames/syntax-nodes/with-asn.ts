import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "../interfaces/ast-node";
import { ExprAsn } from "./expr-asn";
import { LiteralListAsn } from "./literal-list-asn";

export class WithAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly obj: ExprAsn,
    private readonly withClause: LiteralListAsn,
    public readonly fieldId: string,
    scope: Scope,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors
      .concat(this.obj.aggregateCompileErrors())
      .concat(this.withClause.aggregateCompileErrors());
  }

  compile(): string {
    throw new Error("Method not implemented.");
  }

  symbolType() {
    return this.obj.symbolType();
  }

  toString() {
    return `With (${this.obj}) (${this.withClause})`;
  }
}
