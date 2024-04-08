import { Scope } from "../interfaces/scope";
import { Field } from "../interfaces/field";
import { AstNode } from "./ast-node";

export class ParamDefAsn {

    constructor(public id: string, private type: AstNode, private scope : Scope) {
    }

    get symbolType() {
        return this.type.symbolType;
    }

    toString() {
        return `Param ${this.id} : ${this.type}`;
    }
}