import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";
import { ExprAsn } from "./expr-asn";
import { RangeAsn } from "./range-asn";

export class IndexAsn implements AstNode {

    constructor(public readonly index: ExprAsn, private scope : Scope) {
    }

    compile(): string {
        if (this.index instanceof RangeAsn){
            return `${this.index.compile()}`;
        }

        return `[${this.index.compile()}]`;
    }

    get symbolType() {
        return undefined;
    }

    toString() {
        return `[${this.index}]`;
    }
}