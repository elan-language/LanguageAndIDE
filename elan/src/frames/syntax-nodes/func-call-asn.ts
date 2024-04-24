import { ClassType } from "../../symbols/class-type";
import { FunctionType } from "../../symbols/function-type";
import { SymbolScope } from "../../symbols/symbol";
import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";
import { ExprAsn } from "./expr-asn";

export class FuncCallAsn implements AstNode {

    constructor(private id: string, private qualifier: AstNode | undefined, private parameters: Array<AstNode>, private scope : Scope) {
        this.id = id.trim();
    }
    compile(): string {
        var currentScope = this.scope;
        var scopeQ = "";

        const classScope =  this.qualifier ? this.qualifier.symbolType : undefined;
        if (classScope instanceof ClassType) {
           const s = this.scope.resolveSymbol(classScope.className, this.scope);
           // replace scope with class scope
           currentScope = s as unknown as Scope;
        }
        
        const symbol = currentScope.resolveSymbol(this.id, this.scope);

        if (symbol.symbolScope === SymbolScope.stdlib) {
            scopeQ = `_stdlib.`;
        }
        if (symbol.symbolScope === SymbolScope.property) {
            scopeQ = `this.`;
        }
        if (symbol.symbolType instanceof FunctionType) {
            if (symbol.symbolType.isExtension && this.qualifier) {
                this.parameters = [this.qualifier].concat(this.parameters);
                this.qualifier = undefined;
            }
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