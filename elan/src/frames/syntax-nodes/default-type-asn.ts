import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";

export class DefaultTypeAsn {

    constructor(private type: AstNode, private scope : Scope) {
    }

    get symbolType() {
        return this.type.symbolType;
    }

    toString() {
        return `Default (${this.type})`;
    }
}