import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";

export class NewAsn implements AstNode {

    constructor(private type: AstNode, private parameters: AstNode[], private scope : Scope) {
    }
    renderAsObjectCode(): string {
        const pp = this.parameters.map(p => p.renderAsObjectCode()).join(", ");
        return `new ${this.type.renderAsObjectCode()}{${pp}}`;
    }

    get symbolType() {
        return this.type.symbolType;
    }

    toString() {
        const pp = this.parameters.map(p => p.toString()).join(", ");
        return `new ${this.type}(${pp})`;
    }
}