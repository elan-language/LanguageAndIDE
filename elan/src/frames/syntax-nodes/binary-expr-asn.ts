import { BooleanType } from "../../symbols/boolean-type";
import { Field } from "../interfaces/field";
import { AstNode } from "./ast-node";
import { ExprAsn } from "./expr-asn";
import { OperationSymbol } from "./operation-symbol";

export class BinaryExprAsn implements AstNode {

    constructor(private op: OperationSymbol, private lhs: ExprAsn, private rhs: ExprAsn, field : Field) {

    }

    get symbolType() {
        switch (this.op) {
            case OperationSymbol.Not : return BooleanType.Instance;
            default: return this.lhs.symbolType;
        }
    }

    toString() {
        return `${OperationSymbol[this.op]} (${this.lhs}) (${this.rhs})`;
    }
}