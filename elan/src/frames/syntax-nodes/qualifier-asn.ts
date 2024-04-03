import { BooleanType } from "../../symbols/boolean-type";
import { Field } from "../interfaces/field";
import { AstNode } from "./ast-node";
import { ExprAsn } from "./expr-asn";
import { OperationSymbol } from "./operation-symbol";

export class QualifierAsn implements AstNode {

    constructor(field : Field) {

    }

    get symbolType() {
        return undefined;
    }

    toString() {
        return ``;
    }
}