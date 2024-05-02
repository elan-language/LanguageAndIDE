import { SymbolScope } from "../../symbols/symbol";
import { CompileError } from "../compile-error";
import { isMember } from "../helpers";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "./ast-node";

export class IdAsn extends AbstractAstNode implements AstNode {

    constructor(public id: string, public fieldId: string, private scope: Scope) {
        super();
        this.id = id.trim();
    }

    aggregateCompileErrors(): CompileError[] {
        return this.compileErrors;
    }


    compile(): string {
        this.compileErrors = [];
        if (isMember(this.scope)) {
            // don't prefix properties with this
            return this.id;
        }
        const symbol = this.scope.resolveSymbol(this.id, this.scope);
        if (symbol?.symbolScope === SymbolScope.stdlib) {
            return `_stdlib.${this.id}`;
        }
        if (symbol?.symbolScope === SymbolScope.property) {
            return `this.${this.id}`;
        }
        return this.id;
    }

    get symbolType() {
        return this.scope.resolveSymbol(this.id, this.scope)?.symbolType;
    }

    toString() {
        return this.id;
    }
}