import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";
import { ExprAsn } from "./expr-asn";
import { RangeAsn } from "./range-asn";

export class IndexAsn implements AstNode {

    constructor(public readonly index: ExprAsn, private scope : Scope) {
    }

    renderAsObjectCode(): string {
        if (this.index instanceof RangeAsn){
            return `${this.index.renderAsObjectCode()}`;
        }

        return `[${this.index.renderAsObjectCode()}]`;
    }

    get symbolType() {
        return undefined;
    }

    toString() {
        return `[${this.index}]`;
    }
}