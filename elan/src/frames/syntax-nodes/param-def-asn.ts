import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";

export class ParamDefAsn implements AstNode {

    constructor(public id: string, private type: AstNode, private scope : Scope) {
    }
    renderAsObjectCode(): string {
        throw new Error("Method not implemented.");
    }

    get symbolType() {
        return this.type.symbolType;
    }

    toString() {
        return `Param ${this.id} : ${this.type}`;
    }
}