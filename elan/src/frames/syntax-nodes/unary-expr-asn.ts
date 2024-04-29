import { BooleanType } from "../../symbols/boolean-type";
import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";
import { ExprAsn } from "./expr-asn";
import { OperationSymbol } from "./operation-symbol";

export class UnaryExprAsn implements AstNode {

    constructor(private op: OperationSymbol, private operand: ExprAsn, scope: Scope) {
    }

    compileErrors: CompileError[] = [];

    aggregateCompileErrors(): CompileError[] {
        return this.compileErrors
        .concat(this.operand.aggregateCompileErrors());
    }

    private opToJs() {
        switch (this.op) {
            case OperationSymbol.Not: return "!";
            case OperationSymbol.Minus: return "-";
        }
    }

    compile(): string {
        this.compileErrors = [];
        return `${this.opToJs()}${this.operand.compile()}`;
    }

    get symbolType() {
        switch (this.op) {
            case OperationSymbol.Not: return BooleanType.Instance;
            default: return this.operand.symbolType;
        }
    }

    toString() {
        return `${OperationSymbol[this.op]} (${this.operand})`;
    }
}