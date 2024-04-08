import { Scope } from "../interfaces/scope";
import { ExprAsn } from "./expr-asn";
import { LambdaSigAsn } from "./lambda-sig-asn";

export class LambdaAsn {

    constructor(private signature:LambdaSigAsn, private body: ExprAsn, private scope : Scope) {
    }

    get symbolType() {
        return this.body.symbolType;
    }

    toString() {
        return `Lambda (${this.signature}) => (${this.body})`;
    }
}