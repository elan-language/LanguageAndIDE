import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";

export class DeconstructedListAsn implements AstNode {
    
    constructor(private head : string, private tail : string,  scope : Scope) {
    }
    renderAsObjectCode(): string {
        throw new Error("Method not implemented.");
    }

    get symbolType() {
        return {name : ""};
    }

    toString() {
        return `[${this.head}:${this.tail}]`;
    }
}