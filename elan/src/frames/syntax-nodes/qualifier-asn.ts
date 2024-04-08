import { Scope } from "../interfaces/scope";
import { Field } from "../interfaces/field";
import { AstNode } from "./ast-node";

export class QualifierAsn {

    constructor(private qualifier: AstNode[], private scope : Scope) {
    }

    get symbolType() {
        return undefined;
    }

    toString() {
        return `${this.qualifier.map(p => p.toString()).join(".")}`;
    }
}