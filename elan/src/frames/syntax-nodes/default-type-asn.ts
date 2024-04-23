import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";
import { TypeAsn } from "./type-asn";

export class DefaultTypeAsn implements AstNode {

    constructor(private type: TypeAsn, private scope : Scope) {
    }
    compile(): string {
        return this.type.renderAsDefaultObjectCode();
    }

    get symbolType() {
        return this.type.symbolType;
    }

    toString() {
        return `Default (${this.type})`;
    }
}