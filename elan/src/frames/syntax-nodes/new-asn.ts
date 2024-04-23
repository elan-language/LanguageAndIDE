import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";
import { TypeAsn } from "./type-asn";

export class NewAsn implements AstNode {

    constructor(private typeNode: TypeAsn, private parameters: AstNode[], private scope : Scope) {
    }
    compile(): string {
        var gt = this.typeNode.genericParameters.map(p => `"${p.compile()}"`).join(", ");
        gt = gt ? `, [${gt}]` : "";
        const pp = this.parameters.map(p => p.compile()).join(", ");
        const t = this.typeNode.compile();
        if (this.typeNode.type === "Array"){
            return `system.initialise(system.array(new ${t}(${pp}))${gt})`;
        }

        if (this.typeNode.type === "List"){
            return `system.initialise(system.list(new ${t}(${pp}))${gt})`;
        }

        return `system.initialise(new ${t}(${pp})${gt})`;
    }

    get symbolType() {
        return this.typeNode.symbolType;
    }

    toString() {
        const pp = this.parameters.map(p => p.toString()).join(", ");
        return `new ${this.typeNode}(${pp})`;
    }
}