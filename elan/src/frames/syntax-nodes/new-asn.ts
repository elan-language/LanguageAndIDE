import { Field } from "../interfaces/field";
import { AstNode } from "./ast-node";

export class NewAsn {

    constructor(private type: AstNode, private parameters: AstNode[], private field: Field) {
    }

    get symbolType() {
        return this.type.symbolType;
    }

    toString() {
        const pp = this.parameters.map(p => p.toString()).join(", ");
        return `new ${this.type}(${pp})`;
    }
}