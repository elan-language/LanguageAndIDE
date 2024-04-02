import { Field } from "../interfaces/field";
import { AstNode } from "./ast-node";
import { ExprAsn } from "./expr-asn";

export class WithAsn implements AstNode {

    constructor(private obj: ExprAsn, private withClause: Array<ExprAsn>, field: Field) {

    }

    get symbolType() {
        return this.obj.symbolType;
    }

    toString() {
        const pp = this.withClause.map(p => p.toString()).join(", ");
        return `With (${this.obj}) (${pp})`;
    }
}