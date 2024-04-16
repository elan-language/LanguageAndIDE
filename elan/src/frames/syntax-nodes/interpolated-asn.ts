import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";
import { ExprAsn } from "./expr-asn";

export class InterpolatedAsn implements AstNode {

    constructor(private body: ExprAsn, private scope: Scope) {
    }
    renderAsObjectCode(): string {
        return `\${_stdlib.asString(${this.body.renderAsObjectCode()})}`;
    }

    get symbolType() {
        return this.body.symbolType;
    }

    toString() {
        return `(${this.body})`;
    }
}