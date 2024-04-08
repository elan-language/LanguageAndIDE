import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";

export class VarAsn {

    constructor(private id: string, private qualifier: AstNode | undefined, private index: AstNode | undefined, private scope : Scope) {
        this.id = id.trim();
    }

    get symbolType() {
        return this.scope.resolveSymbol(this.id, this.scope).symbolType;
    }

    toString() {
        const q = this.qualifier ? `${this.qualifier}.` : "";
        const idx = this.index ? `${this.index}` : "";
        return `${q}${this.id}${idx}`;
    }
}