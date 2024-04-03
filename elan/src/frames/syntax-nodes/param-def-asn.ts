import { Field } from "../interfaces/field";
import { AstNode } from "./ast-node";

export class ParamDefAsn {

    constructor(private id: string, private type: AstNode, private field: Field) {
    }

    get symbolType() {
        return this.type.symbolType;
    }

    toString() {
        return `Param ${this.id} : ${this.type}`;
    }

}