import { CompileError } from "../compile-error";
import { mustBeOfType } from "../compile-rules";
import { AstNode } from "../interfaces/ast-node";
import { BooleanType } from "../symbols/boolean-type";
import { AbstractAstNode } from "./abstract-ast-node";

export class IfExprAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly condition: AstNode,
    private readonly expr1: AstNode,
    private readonly expr2: AstNode,
    public readonly fieldId: string,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors
      .concat(this.condition.aggregateCompileErrors())
      .concat(this.expr1.aggregateCompileErrors())
      .concat(this.expr2.aggregateCompileErrors());
  }

  compile(): string {
    this.compileErrors = [];
    mustBeOfType(this.condition, BooleanType.Instance, this.compileErrors, this.fieldId);
    return `${this.condition.compile()} ? ${this.expr1.compile()} : ${this.expr2.compile()}`;
  }

  symbolType() {
    return this.expr1.symbolType();
  }

  toString() {
    return `${this.condition} ? ${this.expr1} : ${this.expr2}`;
  }
}
