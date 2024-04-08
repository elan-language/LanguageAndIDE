import { Scope } from "../interfaces/scope";
import { ExprAsn } from "./expr-asn";

export class IndexAsn {

    constructor(private index: ExprAsn, private scope : Scope) {
    }

    get symbolType() {
        return undefined;
    }

    toString() {
        return `[${this.index}]`;
    }
}