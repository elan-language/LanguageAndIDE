import { SymbolScope } from "../../symbols/symbol";
import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";

export class IdAsn implements AstNode {

    constructor(private id: string, private scope : Scope) {
        this.id = id.trim();
    }
    renderAsObjectCode(): string {
        if (this.scope.resolveSymbol(this.id, this.scope).symbolScope === SymbolScope.stdlib){
            return `_stdlib.${this.id}`;    
        }
        if (this.scope.resolveSymbol(this.id, this.scope).symbolScope === SymbolScope.property){
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