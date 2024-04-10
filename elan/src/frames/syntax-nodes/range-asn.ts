import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";

export class RangeAsn implements AstNode {

    constructor(private from : AstNode | undefined, private to : AstNode | undefined,  private scope : Scope) {
        
    }
    renderAsObjectCode(): string {
        const f = this.from ? `${this.from.renderAsObjectCode()}` : "0";
        const t = this.to ? `${this.to.renderAsObjectCode()}` : undefined;

        if (t) {
            return `.slice(${f}, ${t})`;
        }
        return `.slice(${f})`;
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