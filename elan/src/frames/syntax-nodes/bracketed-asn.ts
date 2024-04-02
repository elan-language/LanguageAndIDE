import { Field } from "../interfaces/field";
import { ExprAsn } from "./expr-asn";

export class BracketedAsn {

    constructor(private body : ExprAsn, private field : Field) {
    }

    get symbolType() {
        return this.body.symbolType;
    }

    toString() {
        return  `(${this.body})`;
    }

}