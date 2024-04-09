import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";
import { ExprAsn } from "./expr-asn";

export class IfExprAsn implements AstNode {

    constructor(private condition: ExprAsn, private expr1: ExprAsn, private expr2: ExprAsn, scope: Scope) {
    }
    renderAsObjectCode(): string {
        throw new Error("Method not implemented.");
    }

    get symbolType() {
        return this.expr1.symbolType;
    }

    toString() {
        return `Ternary (${this.condition}) ? (${this.expr1}) : (${this.expr2})`;
    }
}