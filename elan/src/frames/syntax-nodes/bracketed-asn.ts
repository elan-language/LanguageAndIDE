import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";
import { ExprAsn } from "./expr-asn";

export class BracketedAsn implements AstNode {

    constructor(private body: ExprAsn, private scope: Scope) {
    }
    compile(): string {
        return `(${this.body.compile()})`;
    }

    get symbolType() {
        return this.body.symbolType;
    }

    toString() {
        return `(${this.body})`;
    }
}