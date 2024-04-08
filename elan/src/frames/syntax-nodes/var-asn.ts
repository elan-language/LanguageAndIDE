import { ListType } from "../../symbols/list-type";
import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";

export class VarAsn {

    constructor(private id: string, private qualifier: AstNode | undefined, private index: AstNode | undefined, private scope : Scope) {
        this.id = id.trim();
    }

    get symbolType() {
        const rootType = this.scope.resolveSymbol(this.id, this.scope).symbolType;
        if (this.index && rootType instanceof ListType) {
            return rootType.ofType;
        }
        return this.scope.resolveSymbol(this.id, this.scope).symbolType;
    }

    toString() {
        const q = this.qualifier ? `${this.qualifier}.` : "";
        const idx = this.index ? `${this.index}` : "";
        return `${q}${this.id}${idx}`;
    }
}