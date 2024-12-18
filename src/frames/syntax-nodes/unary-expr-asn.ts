import { CompileError } from "../compile-error";
import { AstNode } from "../interfaces/ast-node";
import { BooleanType } from "../symbols/boolean-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { mapOperationSymbol } from "./ast-helpers";
import { OperationSymbol } from "./operation-symbol";

export class UnaryExprASn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly op: OperationSymbol,
    private readonly operand: AstNode,
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
