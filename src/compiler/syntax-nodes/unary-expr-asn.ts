import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { BooleanType } from "../../compiler/symbols/boolean-type";
import { getGlobalScope } from "../../compiler/symbols/symbol-helpers";
import { CompileError } from "../compile-error";
import {
  mustBeBooleanType,
  mustBeKnownOperation,
  mustBeNumberType,
  mustNotBeTwoUnaryExpressions as mustNotBeSequentialUnaryExpressions,
} from "../compile-rules";
import { AbstractAstNode } from "./abstract-ast-node";
import { mapOperation } from "./ast-helpers";
import { OperationSymbol } from "./operation-symbol";

export class UnaryExprAsn extends AbstractAstNode implements AstNode {
  constructor(
    public readonly op: string,
    public readonly operand: AstNode,
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  compileErrors: CompileError[] = [];

  isNegativeOperation() {
    return mapOperation(this.op) === OperationSymbol.Minus;
  }

  private opToJs(opSymbol: OperationSymbol) {
    switch (opSymbol) {
      case OperationSymbol.Not:
        return "!";
      case OperationSymbol.Minus:
        return "-";
      default:
        return " ";
    }
  }

  compile(): string {
    this.compileErrors = [];

    if (this.operand instanceof UnaryExprAsn) {
      mustNotBeSequentialUnaryExpressions(this.compileErrors, this.fieldId);
    }

    const opSymbol = mapOperation(this.op);

    if (opSymbol === OperationSymbol.Unknown) {
      mustBeKnownOperation(this.op, this.compileErrors, this.fieldId);
    }

    const code = `${this.opToJs(opSymbol)}${this.operand.compile()}`;
    const opSt = this.operand.symbolType();

    if (opSymbol === OperationSymbol.Minus) {
      mustBeNumberType(opSt, this.compileErrors, this.fieldId);
      getGlobalScope(this.scope).addCompileErrors(this.compileErrors);
      // to avoid js compile errors with exponents
      return `(${code})`;
    }

    // not
    mustBeBooleanType(opSt, this.compileErrors, this.fieldId);

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);
    return code;
  }

  symbolType() {
    const opSymbol = mapOperation(this.op);

    switch (opSymbol) {
      case OperationSymbol.Not:
        return BooleanType.Instance;
      default:
        return this.operand.symbolType();
    }
  }

  toString() {
    return `${this.op} ${this.operand}`;
  }
}
