import { CompileError } from "../compile-error";
import {
  mustBeBooleanType,
  mustBeCoercibleType,
  mustBeCompatibleType,
  mustBeNumberType,
} from "../compile-rules";
import { AstNode } from "../interfaces/ast-node";
import { Scope } from "../interfaces/scope";
import { SymbolType } from "../interfaces/symbol-type";
import { BooleanType } from "../symbols/boolean-type";
import { EnumType } from "../symbols/enum-type";
import { FloatType } from "../symbols/float-type";
import { IntType } from "../symbols/int-type";
import { ListType } from "../symbols/list-type";
import { StringType } from "../symbols/string-type";
import { isValueType } from "../symbols/symbol-helpers";
import { AbstractAstNode } from "./abstract-ast-node";
import { mapOperationSymbol } from "./ast-helpers";
import { ExprAsn } from "./expr-asn";
import { OperationSymbol } from "./operation-symbol";

export class BinaryExprAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly op: OperationSymbol,
    private readonly lhs: ExprAsn,
    private readonly rhs: ExprAsn,
    public readonly fieldId: string,
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

  private isEqualityOp() {
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
      case OperationSymbol.Divide:
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
      case OperationSymbol.Multiply:
        return "*";
      case OperationSymbol.And:
        return "&&";
      case OperationSymbol.Or:
        return "||";
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
      case OperationSymbol.Divide:
        return "/";
      case OperationSymbol.Pow:
        return "**";
    }
  }

  isAppendPrependable(st: SymbolType) {
    return (
      st instanceof StringType ||
      st instanceof IntType ||
      st instanceof FloatType ||
      st instanceof EnumType
    );
  }

  compile(): string {
    this.compileErrors = [];

    const lst = this.lhs.symbolType();
    const rst = this.rhs.symbolType();

    if (this.op === OperationSymbol.Add && (lst instanceof ListType || rst instanceof ListType)) {
      if (lst instanceof ListType && rst instanceof ListType) {
        mustBeCompatibleType(lst, rst, this.compileErrors, this.fieldId);
      } else if (lst instanceof ListType) {
        mustBeCompatibleType(lst.ofType, rst, this.compileErrors, this.fieldId);
      } else if (rst instanceof ListType) {
        mustBeCompatibleType(lst, rst.ofType, this.compileErrors, this.fieldId);
      }
      return `system.concat(${this.lhs.compile()}, ${this.rhs.compile()})`;
    }

    if (
      this.op === OperationSymbol.Add &&
      this.isAppendPrependable(lst) &&
      this.isAppendPrependable(rst)
    ) {
      return `${this.lhs.compile()} + ${this.rhs.compile()}`;
    }

    if (this.isEqualityOp()) {
      mustBeCoercibleType(lst, rst, this.compileErrors, this.fieldId);
    }

    if (this.isCompareOp() || this.isArithmeticOp()) {
      mustBeNumberType(lst, rst, this.compileErrors, this.fieldId);
    }

    if (this.isLogicalOp()) {
      mustBeBooleanType(lst, rst, this.compileErrors, this.fieldId);
    }

    if (this.op === OperationSymbol.Equals && (isValueType(lst) || isValueType(rst))) {
      return `${this.lhs.compile()} ${this.opToJs()} ${this.rhs.compile()}`;
    }

    if (this.op === OperationSymbol.Equals) {
      return `system.objectEquals(${this.lhs.compile()}, ${this.rhs.compile()})`;
    }

    return `${this.lhs.compile()} ${this.opToJs()} ${this.rhs.compile()}`;
  }

  symbolType() {
    switch (this.op) {
      case OperationSymbol.Add:
        return this.MostPreciseSymbol(this.lhs.symbolType(), this.rhs.symbolType());
      case OperationSymbol.Minus:
        return this.MostPreciseSymbol(this.lhs.symbolType(), this.rhs.symbolType());
      case OperationSymbol.Multiply:
        return this.MostPreciseSymbol(this.lhs.symbolType(), this.rhs.symbolType());
      case OperationSymbol.Divide:
        return FloatType.Instance;
      case OperationSymbol.And:
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
    return `${this.lhs} ${mapOperationSymbol(this.op)} ${this.rhs}`;
  }
}
