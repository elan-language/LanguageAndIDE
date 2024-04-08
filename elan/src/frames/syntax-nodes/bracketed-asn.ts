import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";
import { ExprAsn } from "./expr-asn";

export class BracketedAsn implements AstNode {

    constructor(private body: ExprAsn, private scope: Scope) {
    }
    renderAsObjectCode(): string {
        throw new Error("Method not implemented.");
    }

    get symbolType() {
        return this.body.symbolType;
    }

    toString() {
        return `(${this.body})`;
    }
}