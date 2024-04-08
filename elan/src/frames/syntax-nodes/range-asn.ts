import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";

export class RangeAsn {

    constructor(private from : AstNode | undefined, private to : AstNode | undefined,  private scope : Scope) {
        
    }

    get symbolType() {
        return undefined;
    }

    toString() {
        const f = this.from ? `${this.from}` : "";
        const t = this.to ? `${this.to}` : "";
        return `Range ${f}..${t}`;
    }
}