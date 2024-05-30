import { BooleanType } from "../symbols/boolean-type";
import { IntType } from "../symbols/int-type";
import { ImmutableListType } from "../symbols/immutable-list-type";
import { FloatType } from "../symbols/number-type";
import { SymbolType } from "../interfaces/symbol-type";
import { CompileError } from "../compile-error";
import {
  mustBeBooleanType,
  mustBeCoercibleType,
  mustBeCompatibleType,
  mustBeNumberType,
} from "../compile-rules";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "../interfaces/ast-node";
import { ExprAsn } from "./expr-asn";
import { OperationSymbol } from "./operation-symbol";
import { StringType } from "../symbols/string-type";
import { ClassType } from "../symbols/class-type";

export class BinaryExprAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly op: OperationSymbol,
    private readonly lhs: ExprAsn,
    private readonly rhs: ExprAsn,
    public readonly fieldId: string,
    scope: Scope,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors
      .concat(this.lhs.aggregateCompileErrors())
      .concat(this.rhs.aggregateCompileErrors());
  }

  private MostPreciseSymbol(lhs: SymbolType, rhs: SymbolType): SymbolType {
    if (lhs instanceof FloatType || rhs instanceof FloatType) {
      return FloatType.Instance;
    }

    return lhs;
  }

  private isCoercibleOp() {
    switch (this.op) {
      case OperationSymbol.Equals:
      case OperationSymbol.NotEquals:
        return true;
    }
    return false;
  }

  private isArithmeticOp() {
    switch (this.op) {
      case OperationSymbol.Add:
      case OperationSymbol.Minus:
      case OperationSymbol.Multiply:
      case OperationSymbol.Div:
      case OperationSymbol.Divide:
      case OperationSymbol.Mod:
      case OperationSymbol.Pow:
        return true;
    }
    return false;
  }

  private isCompareOp() {
    switch (this.op) {
      case OperationSymbol.LT:
      case OperationSymbol.GT:
      case OperationSymbol.GTE:
      case OperationSymbol.LTE:
        return true;
    }
    return false;
  }

  private isLogicalOp() {
    switch (this.op) {
      case OperationSymbol.And:
      case OperationSymbol.Or:
      case OperationSymbol.Xor:
        return true;
    }
    return false;
  }

  private opToJs() {
    switch (this.op) {
      case OperationSymbol.Add:
        return "+";
      case OperationSymbol.Minus:
        return "-";
      case OperationSymbol.Not:
        return "!";
      case OperationSymbol.Multiply:
        return "*";
      case OperationSymbol.And:
        return "&&";
      case OperationSymbol.Or:
        return "||";
      case OperationSymbol.Xor:
        return "!=";
      case OperationSymbol.Equals:
        return "===";
      case OperationSymbol.NotEquals:
        return "!==";
      case OperationSymbol.LT:
        return "<";
      case OperationSymbol.GT:
        return ">";
      case OperationSymbol.GTE:
        return ">=";
      case OperationSymbol.LTE:
        return "<=";
      case OperationSymbol.Div:
        return "/";
      case OperationSymbol.Mod:
        return "%";
      case OperationSymbol.Divide:
        return "/";
      case OperationSymbol.Pow:
        return "**";
    }
  }

  compile(): string {
    this.compileErrors = [];

    const lst = this.lhs.symbolType();
    const rst = this.rhs.symbolType();

    if (
      this.op === OperationSymbol.Add &&
      (lst instanceof ImmutableListType || rst instanceof ImmutableListType)
    ) {
      if (
        lst instanceof ImmutableListType &&
        rst instanceof ImmutableListType
      ) {
        mustBeCompatibleType(lst, rst, this.compileErrors, this.fieldId);
      } else if (lst instanceof ImmutableListType) {
        mustBeCompatibleType(lst.ofType, rst, this.compileErrors, this.fieldId);
      } else if (rst instanceof ImmutableListType) {
        mustBeCompatibleType(lst, rst.ofType, this.compileErrors, this.fieldId);
      }
      return `system.concat(${this.lhs.compile()}, ${this.rhs.compile()})`;
    }

    if (
      this.op === OperationSymbol.Add &&
      (lst instanceof StringType || rst instanceof StringType)
    ) {
      return `${this.lhs.compile()} + ${this.rhs.compile()}`;
    }

    if (this.isCoercibleOp()) {
      mustBeCoercibleType(lst, rst, this.compileErrors, this.fieldId);
    }

    if (this.isCompareOp() || this.isArithmeticOp()) {
      mustBeNumberType(lst, rst, this.compileErrors, this.fieldId);
    }

    if (this.isLogicalOp()) {
      mustBeBooleanType(lst, rst, this.compileErrors, this.fieldId);
    }

    if (
      this.op === OperationSymbol.Add &&
      (lst instanceof ImmutableListType || rst instanceof ImmutableListType)
    ) {
      return `system.concat(${this.lhs.compile()}, ${this.rhs.compile()})`;
    }

    if (
      this.op === OperationSymbol.Equals &&
      (lst instanceof ClassType || rst instanceof ClassType)
    ) {
      return `system.objectEquals(${this.lhs.compile()}, ${this.rhs.compile()})`;
    }

    const code = `${this.lhs.compile()} ${this.opToJs()} ${this.rhs.compile()}`;

    if (this.op === OperationSymbol.Div) {
      return `Math.floor(${code})`;
    }

    return code;
  }

  symbolType() {
    switch (this.op) {
      case OperationSymbol.Add:
        return this.MostPreciseSymbol(
          this.lhs.symbolType(),
          this.rhs.symbolType(),
        );
      case OperationSymbol.Minus:
        return this.MostPreciseSymbol(
          this.lhs.symbolType(),
          this.rhs.symbolType(),
        );
      case OperationSymbol.Multiply:
        return this.MostPreciseSymbol(
          this.lhs.symbolType(),
          this.rhs.symbolType(),
        );
      case OperationSymbol.Div:
        return IntType.Instance;
      case OperationSymbol.Mod:
        return IntType.Instance;
      case OperationSymbol.Divide:
        return FloatType.Instance;
      case OperationSymbol.And:
        return BooleanType.Instance;
      case OperationSymbol.Not:
        return BooleanType.Instance;
      case OperationSymbol.Xor:
        return BooleanType.Instance;
      case OperationSymbol.Equals:
        return BooleanType.Instance;
      case OperationSymbol.NotEquals:
        return BooleanType.Instance;
      case OperationSymbol.LT:
        return BooleanType.Instance;
      case OperationSymbol.GT:
        return BooleanType.Instance;
      case OperationSymbol.LTE:
        return BooleanType.Instance;
      case OperationSymbol.GTE:
        return BooleanType.Instance;
      default:
        return this.lhs.symbolType();
    }
  }

  toString() {
    return `${OperationSymbol[this.op]} (${this.lhs}) (${this.rhs})`;
  }
}
