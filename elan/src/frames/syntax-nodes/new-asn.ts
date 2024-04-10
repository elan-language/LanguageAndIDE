import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";
import { TypeAsn } from "./type-asn";

export class NewAsn implements AstNode {

    constructor(private type: TypeAsn, private parameters: AstNode[], private scope : Scope) {
    }
    renderAsObjectCode(): string {
        var gt = this.type.genericParameters.map(p => `"${p.renderAsObjectCode()}"`).join(", ");
        gt = gt ? `, [${gt}]` : "";
        const pp = this.parameters.map(p => p.renderAsObjectCode()).join(", ");
        return `system.initialise(new ${this.type.renderAsObjectCode()}(${pp})${gt})`;
    }

    get symbolType() {
        return this.type.symbolType;
    }

    toString() {
        const pp = this.parameters.map(p => p.toString()).join(", ");
        return `new ${this.type}(${pp})`;
    }
}