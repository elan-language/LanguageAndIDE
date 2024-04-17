import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";

export class CsvAsn implements AstNode {
    
    constructor(public readonly items: AstNode[], scope : Scope) {
    }

    renderAsObjectCode(): string {
        const it = this.items.map(p => p.renderAsObjectCode()).join(", ");
        return `${it}`;
    }

    get symbolType() {
        return undefined;
    }

    toString() {
        const it = this.items.map(p => p.toString()).join(", ");
        return `${it}`;
    }
}