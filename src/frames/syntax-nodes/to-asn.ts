import { CompileError } from "../compile-error";
import { AstIdNode } from "../interfaces/ast-id-node";
import { AbstractAstNode } from "./abstract-ast-node";
import { ExprAsn } from "./expr-asn";

export class ToAsn extends AbstractAstNode implements AstIdNode {
  constructor(
    public readonly id: string,
    private readonly to: ExprAsn,
    public readonly fieldId: string,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors.concat(this.to.aggregateCompileErrors());
  }

  compile(): string {
    this.compileErrors = [];
    return `${this.id} = ${this.to.compile()}`;
  }

  symbolType() {
    return this.to.symbolType();
  }

  toString() {
    return ` ${this.id} to ${this.to}`;
  }
}
