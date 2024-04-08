import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";

export class IdAsn implements AstNode {

    constructor(private id: string, private scope : Scope) {
        this.id = id.trim();
    }
    renderAsObjectCode(): string {
        throw new Error("Method not implemented.");
    }

    get symbolType() {
        return this.scope.resolveSymbol(this.id, this.scope).symbolType;
    }

    toString() {
        return this.id;
    }
}