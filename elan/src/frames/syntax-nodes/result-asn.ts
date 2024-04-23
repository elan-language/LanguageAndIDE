import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";

export class ResultAsn implements AstNode {

    constructor(private scope : Scope) {
        
    }
    compile(): string {
        throw new Error("Method not implemented.");
    }

    get symbolType() {
        return undefined;
    }

    toString() {
        return "Result";
    }
}