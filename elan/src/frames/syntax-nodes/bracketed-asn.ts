import { Scope } from "../interfaces/scope";
import { ExprAsn } from "./expr-asn";

export class BracketedAsn {

    constructor(private body: ExprAsn, private scope: Scope) {
    }

    get symbolType() {
        return this.body.symbolType;
    }

    toString() {
        return `(${this.body})`;
    }
}