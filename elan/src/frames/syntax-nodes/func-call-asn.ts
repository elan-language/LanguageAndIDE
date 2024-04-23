import { SymbolScope } from "../../symbols/symbol";
import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";
import { ExprAsn } from "./expr-asn";

export class FuncCallAsn implements AstNode {

    constructor(private id: string, private qualifier: AstNode | undefined, private parameters: Array<ExprAsn>, private scope : Scope) {
        this.id = id.trim();
    }
    compile(): string {
        var scopeQ = "";
        const symbol = this.scope.resolveSymbol(this.id, this.scope);

        if (symbol.symbolScope === SymbolScope.stdlib) {
            scopeQ = `_stdlib.`;
        }
        if (symbol.symbolScope === SymbolScope.property) {
            scopeQ = `this.`;
        }

        const pp = this.parameters.map(p => p.compile()).join(", ");
        const q = this.qualifier ? `${this.qualifier.compile()}.` : scopeQ;
        return `${q}${this.id}(${pp})`;
    }

    get symbolType() {
      
        return this.scope.resolveSymbol(this.id, this.scope).symbolType;
    }

    toString() {
        const pp = this.parameters.map(p => p.toString()).join(", ");
        const q = this.qualifier ? `${this.qualifier}.` : "";
        return `Func Call ${q}${this.id} (${pp})`;
    }
}