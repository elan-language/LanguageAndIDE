import { BooleanType } from "../../symbols/boolean-type";
import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";
import { ExprAsn } from "./expr-asn";
import { OperationSymbol } from "./operation-symbol";

export class UnaryExprAsn implements AstNode {

    constructor(private op: OperationSymbol, private operand: ExprAsn, scope : Scope) {
    }
    renderAsObjectCode(): string {
        throw new Error("Method not implemented.");
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