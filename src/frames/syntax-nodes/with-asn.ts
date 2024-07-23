import { CompileError } from "../compile-error";
import { AstNode } from "../interfaces/ast-node";
import { Scope } from "../interfaces/scope";
import { CSV } from "../parse-nodes/csv";
import { AbstractAstNode } from "./abstract-ast-node";
import { ExprAsn } from "./expr-asn";

export class WithAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly obj: ExprAsn,
    private readonly withClause: CSV | undefined,
    public readonly fieldId: string,
    scope: Scope,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors.concat(this.obj.aggregateCompileErrors());
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
