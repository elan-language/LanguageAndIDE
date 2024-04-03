import { Field } from "../interfaces/field";
import { AstNode } from "./ast-node";
import { ExprAsn } from "./expr-asn";
import { LiteralListAsn } from "./literal-list-asn";

export class WithAsn implements AstNode {

    constructor(private obj: ExprAsn, private withClause: LiteralListAsn, field: Field) {
    }

    get symbolType() {
        return this.obj.symbolType;
    }

    toString() {
        return `With (${this.obj}) (${this.withClause})`;
    }
}