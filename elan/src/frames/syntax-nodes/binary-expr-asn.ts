import { BooleanType } from "../../symbols/boolean-type";
import { ClassType } from "../../symbols/class-type";
import { ListType } from "../../symbols/list-type";
import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";
import { ExprAsn } from "./expr-asn";
import { OperationSymbol } from "./operation-symbol";

export class BinaryExprAsn implements AstNode {

    constructor(private op: OperationSymbol, private lhs: ExprAsn, private rhs: ExprAsn, scope: Scope) {
    }

    private opToJs() {
        switch (this.op) {
            case OperationSymbol.Add : return "+";
            case OperationSymbol.Minus : return "-";
            case OperationSymbol.Not : return "!";
            case OperationSymbol.Multiply : return "*";
            case OperationSymbol.And : return "&&";
            case OperationSymbol.Or : return "||";
            case OperationSymbol.Xor : return "!=";
            case OperationSymbol.Equals : return "===";
            case OperationSymbol.NotEquals : return "!==";
            case OperationSymbol.LT : return "<";
            case OperationSymbol.GT : return ">";
            case OperationSymbol.GTE : return ">=";
            case OperationSymbol.LTE : return "<=";
            case OperationSymbol.Div : return "/";
            case OperationSymbol.Mod : return "%";
            case OperationSymbol.Divide : return "/";
            case OperationSymbol.Pow : return "**";
        }
    }

    renderAsObjectCode(): string {
        if (this.op === OperationSymbol.Add && (this.lhs.symbolType instanceof ListType || this.rhs.symbolType instanceof ListType)) {
            return `system.concat(${this.lhs.renderAsObjectCode()}, ${this.rhs.renderAsObjectCode()})`;
        }

        if (this.op === OperationSymbol.Equals && (this.lhs.symbolType instanceof ClassType || this.rhs.symbolType instanceof ClassType)) {
            return `system.objectEquals(${this.lhs.renderAsObjectCode()}, ${this.rhs.renderAsObjectCode()})`;
        }

        const code = `${this.lhs.renderAsObjectCode()} ${this.opToJs()} ${this.rhs.renderAsObjectCode()}`;

        if (this.op === OperationSymbol.Div) {
            return `Math.floor(${code})`;
        }

        return code;
    }

    get symbolType() {
        switch (this.op) {
            case OperationSymbol.And: return BooleanType.Instance;
            case OperationSymbol.Not: return BooleanType.Instance;
            default: return this.lhs.symbolType;
        }
    }

    toString() {
        return `${OperationSymbol[this.op]} (${this.lhs}) (${this.rhs})`;
    }
}