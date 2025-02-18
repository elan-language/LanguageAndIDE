import { CompileError } from "../compile-error";
import {
  mustBeBooleanType,
  mustBeNumberType,
  mustNotBeTwoUnaryExpressions as mustNotBeSequentialUnaryExpressions,
} from "../compile-rules";
import { AstNode } from "../interfaces/ast-node";
import { BooleanType } from "../symbols/boolean-type";
import { AbstractAstNode } from "./abstract-ast-node";
import { mapOperationSymbol } from "./ast-helpers";
import { OperationSymbol } from "./operation-symbol";

export class UnaryExprAsn extends AbstractAstNode implements AstNode {
  constructor(
    public readonly op: OperationSymbol,
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

    if (this.operand instanceof UnaryExprAsn) {
      mustNotBeSequentialUnaryExpressions(this.compileErrors, this.fieldId);
    }

    const code = `${this.opToJs()}${this.operand.compile()}`;
    const opSt = this.operand.symbolType();

    if (this.op === OperationSymbol.Minus) {
      mustBeNumberType(opSt, this.compileErrors, this.fieldId);
      // to avoid js compile errors with exponents
      return `(${code})`;
    }

    // not
    mustBeBooleanType(opSt, this.compileErrors, this.fieldId);
    return code;
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
