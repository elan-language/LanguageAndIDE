import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";

export class ResultAsn implements AstNode {

    constructor(private scope : Scope) {
        
    }
    renderAsObjectCode(): string {
        throw new Error("Method not implemented.");
    }

    get symbolType() {
        return undefined;
    }

    toString() {
        return "Result";
    }
}