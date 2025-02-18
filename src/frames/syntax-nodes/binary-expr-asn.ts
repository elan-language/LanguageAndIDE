import { CompileError } from "../compile-error";
import {
  mustBeAssignableType,
  mustBeBooleanType,
  mustBeCoercibleType,
  mustBeIntegerType,
  mustBeNumberType,
} from "../compile-rules";
import { AstNode } from "../interfaces/ast-node";
import { SymbolType } from "../interfaces/symbol-type";
import { BooleanType } from "../symbols/boolean-type";
import { FloatType } from "../symbols/float-type";
import { IntType } from "../symbols/int-type";
import { ListType } from "../symbols/list-type";
import { StringType } from "../symbols/string-type";
import { isValueType, mostPreciseSymbol } from "../symbols/symbol-helpers";
import { AbstractAstNode } from "./abstract-ast-node";
import { mapOperationSymbol } from "./ast-helpers";
import { OperationSymbol } from "./operation-symbol";

export class BinaryExprAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly op: OperationSymbol,
    private readonly lhs: AstNode,
    private readonly rhs: AstNode,
    public readonly fieldId: string,
  ) {
    super();
  }

  aggregateCompileErrors(): CompileError[] {
    return this.compileErrors
      .concat(this.lhs.aggregateCompileErrors())
      .concat(this.rhs.aggregateCompileErrors());
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

  private isNanCheckOp() {
    switch (this.op) {
      case OperationSymbol.Divide:
      case OperationSymbol.Pow:
      case OperationSymbol.Div:
      case OperationSymbol.Mod:
        return true;
    }
    return false;
  }

  private isIntegerOnlyOp() {
    switch (this.op) {
      case OperationSymbol.Div:
      case OperationSymbol.Mod:
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

  isString(st: SymbolType) {
    return st instanceof StringType;
  }

  compile(): string {
    this.compileErrors = [];

    const lhsCode = this.lhs.compile();
    const rhsCode = this.rhs.compile();

    const lst = this.lhs.symbolType();
    const rst = this.rhs.symbolType();

    if (this.op === OperationSymbol.Add && (lst instanceof ListType || rst instanceof ListType)) {
      if (lst instanceof ListType && rst instanceof ListType) {
        mustBeAssignableType(lst, rst, this.compileErrors, this.fieldId);
      } else if (lst instanceof ListType) {
        mustBeAssignableType(lst.ofType, rst, this.compileErrors, this.fieldId);
      } else if (rst instanceof ListType) {
        mustBeAssignableType(lst, rst.ofType, this.compileErrors, this.fieldId);
      }
      return `system.concat(${lhsCode}, ${rhsCode})`;
    }

    if (this.op === OperationSymbol.Add && this.isString(lst) && this.isString(rst)) {
      return `${lhsCode} + ${rhsCode}`;
    }

    if (this.isEqualityOp()) {
      mustBeCoercibleType(lst, rst, this.compileErrors, this.fieldId);
    }

    if (this.isCompareOp() || this.isArithmeticOp()) {
      mustBeNumberType(lst, rst, this.compileErrors, this.fieldId);
    }

    if (this.isIntegerOnlyOp()) {
      mustBeIntegerType(lst, rst, this.compileErrors, this.fieldId);
    }

    if (this.isLogicalOp()) {
      mustBeBooleanType(lst, rst, this.compileErrors, this.fieldId);
    }

    if (this.op === OperationSymbol.Equals && (isValueType(lst) || isValueType(rst))) {
      return `${lhsCode} ${this.opToJs()} ${rhsCode}`;
    }

    if (this.op === OperationSymbol.Equals) {
      return `system.objectEquals(${lhsCode}, ${rhsCode})`;
    }

    let code = `${lhsCode} ${this.opToJs()} ${rhsCode}`;

    if (this.op === OperationSymbol.Div) {
      code = `Math.floor(${code})`;
    }

    return this.isNanCheckOp() ? `system.nanCheck(${code})` : code;
  }

  symbolType() {
    switch (this.op) {
      case OperationSymbol.Add:
        return mostPreciseSymbol(this.lhs.symbolType(), this.rhs.symbolType());
      case OperationSymbol.Minus:
        return mostPreciseSymbol(this.lhs.symbolType(), this.rhs.symbolType());
      case OperationSymbol.Multiply:
        return mostPreciseSymbol(this.lhs.symbolType(), this.rhs.symbolType());
      case OperationSymbol.Pow:
        return mostPreciseSymbol(this.lhs.symbolType(), this.rhs.symbolType());
      case OperationSymbol.Div:
        return IntType.Instance;
      case OperationSymbol.Mod:
        return IntType.Instance;
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
