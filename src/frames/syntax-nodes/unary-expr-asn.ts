import { ElanCompilerError } from "../../elan-compiler-error";
import { CompileError } from "../compile-error";
import {
  mustBeBooleanType,
  mustBeNumberType,
  mustNotBeTwoUnaryExpressions as mustNotBeSequentialUnaryExpressions,
} from "../compile-rules";
import { AstNode } from "../compiler-interfaces/ast-node";
import { Scope } from "../compiler-interfaces/scope";
import { BooleanType } from "../symbols/boolean-type";
import { getGlobalScope } from "../symbols/symbol-helpers";
import { AbstractAstNode } from "./abstract-ast-node";
import { mapOperationSymbol } from "./ast-helpers";
import { OperationSymbol } from "./operation-symbol";

export class UnaryExprAsn extends AbstractAstNode implements AstNode {
  constructor(
    public readonly op: OperationSymbol,
    public readonly operand: AstNode,
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  compileErrors: CompileError[] = [];

  private opToJs() {
    switch (this.op) {
      case OperationSymbol.Not:
        return "!";
      case OperationSymbol.Minus:
        return "-";
      default:
        throw new ElanCompilerError(`No such unary op ${this.op}`);
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
