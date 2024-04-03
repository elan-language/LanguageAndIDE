import { Field } from "../interfaces/field";
import { Frame } from "../interfaces/frame";
import { AstNode } from "./ast-node";
import { ExprAsn } from "./expr-asn";

export class IndexAsn {

    constructor(private index : ExprAsn, private field : Field) {
        
    }

    get symbolType() {
        return undefined;
    }

    toString() {
        return `[${this.index}]`;
    }
}