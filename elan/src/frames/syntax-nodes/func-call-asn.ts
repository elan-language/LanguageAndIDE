import { ArrayType } from "../../symbols/array-type";
import { ClassType } from "../../symbols/class-type";
import { DictionaryType } from "../../symbols/dictionary-type";
import { FunctionType } from "../../symbols/function-type";
import { GenericParameterType } from "../../symbols/generic-parameter-type";
import { IterType } from "../../symbols/iter-type";
import { ListType } from "../../symbols/list-type";
import { SymbolScope } from "../../symbols/symbol";
import { ISymbolType } from "../../symbols/symbol-type";
import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";
import { ExprAsn } from "./expr-asn";

export class FuncCallAsn implements AstNode {

    constructor(private id: string, private qualifier: AstNode | undefined, private parameters: Array<AstNode>, private scope: Scope) {
        this.id = id.trim();
    }
    compile(): string {
        var currentScope = this.scope;
        var scopeQ = "";

        const classScope = this.qualifier ? this.qualifier.symbolType : undefined;
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
    
    flatten(p: ISymbolType): ISymbolType[] {
        if (p instanceof ArrayType || p instanceof ListType || p instanceof IterType) {
            return this.flatten(p.ofType);
        }

        if (p instanceof DictionaryType) {
            return this.flatten(p.keyType).concat(this.flatten(p.valueType));
        }

        return [p];
    }

    get symbolType() {
        const type = this.scope.resolveSymbol(this.id, this.scope).symbolType;

        if (type instanceof FunctionType) {
            const returnType = type.returnType;

            if (returnType instanceof GenericParameterType) {
                const flattened = type.parametersTypes.map(n => this.flatten(n));
                const pTypes = this.parameters.map(p => this.flatten(p.symbolType!));

                for (var i = 0; i < flattened.length; i++) {
                    const pt = flattened[i];
                    const pst = pTypes[i];

                    for (var i = 0; i < pt.length; i++) {
                        const t = pt[i];
                        const st = pst[i];

                        if (t instanceof GenericParameterType && t.id === returnType.id) {
                            return st;
                        }
                    }
                }
                return undefined;
            }
            return returnType;
        }

        return type;
    }

    toString() {
        const pp = this.parameters.map(p => p.toString()).join(", ");
        const q = this.qualifier ? `${this.qualifier}.` : "";
        return `Func Call ${q}${this.id} (${pp})`;
    }
}