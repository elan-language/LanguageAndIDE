import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";

export class QualifierAsn implements AstNode {

    constructor(private qualifier: AstNode[], private scope : Scope) {
    }
    renderAsObjectCode(): string {
        throw new Error("Method not implemented.");
    }

    get symbolType() {
        return undefined;
    }

    toString() {
        return `${this.qualifier.map(p => p.toString()).join(".")}`;
    }
}