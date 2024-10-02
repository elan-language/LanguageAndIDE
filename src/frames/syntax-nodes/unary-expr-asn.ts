import { CompileError } from "../compile-error";
import { AstNode } from "../interfaces/ast-node";
import { Scope } from "../interfaces/scope";
import { BooleanType } from "../symbols/boolean-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { mapOperationSymbol } from "./ast-helpers";
import { ExprAsn } from "./expr-asn";
import { OperationSymbol } from "./operation-symbol";

export class UnaryExprAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly op: OperationSymbol,
    private readonly operand: ExprAsn,
    public readonly fieldId: string,
  ) {
    super();
  }

  compileErrors: CompileError[] = [];

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors.concat(this.operand.aggregateCompileErrors());
  }

  private opToJs() {
    switch (this.op) {
      case OperationSymbol.Not:
        return "!";
      case OperationSymbol.Minus:
        return "-";
    }
  }

  compile(): string {
    this.compileErrors = [];
    return `${this.opToJs()}${this.operand.compile()}`;
  }

  symbolType() {
    switch (this.op) {
      case OperationSymbol.Not:
        return BooleanType.Instance;
      default:
        return this.operand.symbolType();
    }
  }

  toString() {
    return `${mapOperationSymbol(this.op)} ${this.operand}`;
  }
}
