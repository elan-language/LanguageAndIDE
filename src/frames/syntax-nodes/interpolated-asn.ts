import { CompileError } from "../compile-error";
import { AstNode } from "../interfaces/ast-node";
import { AbstractAstNode } from "./abstract-ast-node";
import { ExprAsn } from "./expr-asn";

export class InterpolatedAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly body: ExprAsn,
    public readonly fieldId: string,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors.concat(this.body.aggregateCompileErrors());
  }

  compile(): string {
    this.compileErrors = [];
    return `\${_stdlib.asString(${this.body.compile()})}`;
  }

  symbolType() {
    return this.body.symbolType();
  }

  toString() {
    return `${this.body}`;
  }
}
