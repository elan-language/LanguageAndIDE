import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";

export class DefaultTypeAsn implements AstNode {

    constructor(private type: AstNode, private scope : Scope) {
    }
    renderAsObjectCode(): string {
        throw new Error("Method not implemented.");
    }

    get symbolType() {
        return this.type.symbolType;
    }

    toString() {
        return `Default (${this.type})`;
    }
}