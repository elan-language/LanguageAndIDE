import { AstNode } from "../../compiler/compiler-interfaces/ast-node";
import { Scope } from "../../compiler/compiler-interfaces/scope";
import { SymbolType } from "../../compiler/compiler-interfaces/symbol-type";
import { BooleanType } from "../../compiler/symbols/boolean-type";
import { FloatType } from "../../compiler/symbols/float-type";
import { IntType } from "../../compiler/symbols/int-type";
import { StringType } from "../../compiler/symbols/string-type";
import {
  getGlobalScope,
  isValueType,
  mostPreciseSymbol,
} from "../../compiler/symbols/symbol-helpers";
import {
  adviseAgainstDiv,
  mustBeBooleanTypes,
  mustBeCoercibleType,
  mustBeIntegerType,
  mustBeKnownOperation,
  mustBeNumberTypes,
  mustBeValueType,
} from "../compile-rules";
import { AbstractAstNode } from "./abstract-ast-node";
import { mapOperation } from "./ast-helpers";
import { OperationSymbol } from "./operation-symbol";

export class BinaryExprAsn extends AbstractAstNode implements AstNode {
  constructor(
    private readonly op: string,
    private readonly lhs: AstNode,
    private readonly rhs: AstNode,
    public readonly fieldId: string,
    private readonly scope: Scope,
  ) {
    super();
  }

  private isEqualityOp(opSymbol: OperationSymbol) {
    switch (opSymbol) {
      case OperationSymbol.Equals:
      case OperationSymbol.NotEquals:
        return true;
    }
    return false;
  }

  private isArithmeticOp(opSymbol: OperationSymbol) {
    switch (opSymbol) {
      case OperationSymbol.Add:
      case OperationSymbol.Minus:
      case OperationSymbol.Multiply:
      case OperationSymbol.Divide:
      case OperationSymbol.Pow:
        return true;
    }
    return false;
  }

  private isIntegerOnlyOp(opSymbol: OperationSymbol) {
    switch (opSymbol) {
      case OperationSymbol.Div:
      case OperationSymbol.Mod:
        return true;
    }
    return false;
  }

  private isCompareOp(opSymbol: OperationSymbol) {
    switch (opSymbol) {
      case OperationSymbol.LT:
      case OperationSymbol.GT:
      case OperationSymbol.GTE:
      case OperationSymbol.LTE:
        return true;
    }
    return false;
  }

  private isLogicalOp(opSymbol: OperationSymbol) {
    switch (opSymbol) {
      case OperationSymbol.And:
      case OperationSymbol.Or:
        return true;
    }
    return false;
  }

  private opToJs(opSymbol: OperationSymbol) {
    switch (opSymbol) {
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
    return " ";
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

    const opSymbol = mapOperation(this.op);

    if (opSymbol === OperationSymbol.Unknown) {
      mustBeKnownOperation(this.op, this.compileErrors, this.fieldId);
    }

    if (opSymbol === OperationSymbol.Add && this.isString(lst) && this.isString(rst)) {
      return `${lhsCode} + ${rhsCode}`;
    }

    if (this.isEqualityOp(opSymbol)) {
      mustBeValueType(lst, rst, this.compileErrors, this.fieldId);
      mustBeCoercibleType(lst, rst, this.compileErrors, this.fieldId);
    }

    if (this.isCompareOp(opSymbol) || this.isArithmeticOp(opSymbol)) {
      mustBeNumberTypes(lst, rst, this.compileErrors, this.fieldId);
    }

    if (this.isIntegerOnlyOp(opSymbol)) {
      mustBeIntegerType(lst, rst, this.compileErrors, this.fieldId);
    }

    if (this.isLogicalOp(opSymbol)) {
      mustBeBooleanTypes(lst, rst, this.compileErrors, this.fieldId);
    }

    if (opSymbol === OperationSymbol.Div) {
      adviseAgainstDiv(this.compileErrors, this.fieldId);
    }

    getGlobalScope(this.scope).addCompileErrors(this.compileErrors);

    if (opSymbol === OperationSymbol.Equals && (isValueType(lst) || isValueType(rst))) {
      return `${lhsCode} ${this.opToJs(opSymbol)} ${rhsCode}`;
    }

    if (opSymbol === OperationSymbol.Equals) {
      return `system.objectEquals(${lhsCode}, ${rhsCode})`;
    }

    let code = `${lhsCode} ${this.opToJs(opSymbol)} ${rhsCode}`;

    if (opSymbol === OperationSymbol.Div) {
      code = `Math.floor(${code})`;
    }

    return code;
  }

  symbolType() {
    const opSymbol = mapOperation(this.op);
    switch (opSymbol) {
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
    return `${this.lhs} ${this.op} ${this.rhs}`;
  }
}
