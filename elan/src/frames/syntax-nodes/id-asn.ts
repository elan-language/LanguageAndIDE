import { SymbolScope } from "../../symbols/symbol";
import { Property } from "../class-members/property";
import { isMember } from "../helpers";
import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";

export class IdAsn implements AstNode {

    constructor(private id: string, private scope : Scope) {
        this.id = id.trim();
    }
    compile(): string {
        if (isMember(this.scope)) {
            // don't prefix properties with this
            return this.id;
        }
        const symbol = this.scope.resolveSymbol(this.id, this.scope);
        if (symbol.symbolScope === SymbolScope.stdlib) {
            return `_stdlib.${this.id}`;
        }
        if (symbol.symbolScope === SymbolScope.property) {
            return `this.${this.id}`;
        }
        return this.id;
    }

    get symbolType() {
        return this.scope.resolveSymbol(this.id, this.scope).symbolType;
    }

    toString() {
        return this.id;
    }
}