import { Field } from "../interfaces/field";
import { ExprAsn } from "./expr-asn";

export class LambdaAsn {

    constructor(private parameters: Array<ExprAsn>, private body : ExprAsn, private field : Field) {
    }

    get symbolType() {
        return this.body.symbolType;
    }

    toString() {
        const pp = this.parameters.map(p => p.toString()).join(", ");

        return  `Lambda (${pp}) => (${this.body})`;
    }

}