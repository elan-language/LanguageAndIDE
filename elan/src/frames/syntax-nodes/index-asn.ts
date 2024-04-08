import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";
import { ExprAsn } from "./expr-asn";

export class IndexAsn implements AstNode {

    constructor(private index: ExprAsn, private scope : Scope) {
    }
    renderAsObjectCode(): string {
        throw new Error("Method not implemented.");
    }

    get symbolType() {
        return undefined;
    }

    toString() {
        return `[${this.index}]`;
    }
}