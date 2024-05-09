import { SymbolScope } from "../../symbols/symbol";
import { CompileError } from "../compile-error";
import { mustBeKnownSymbol } from "../compile-rules";
import { isMember } from "../helpers";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { getParentScope } from "./ast-helpers";
import { AstNode } from "./ast-node";

export class IdAsn extends AbstractAstNode implements AstNode {

    constructor(public readonly id: string, public readonly fieldId: string, private readonly scope: Scope) {
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
        const symbol = getParentScope(this.scope).resolveSymbol(this.id, this.scope);
        if (symbol?.symbolScope === SymbolScope.stdlib) {
            return `_stdlib.${this.id}`;
        }
        if (symbol?.symbolScope === SymbolScope.property) {
            return `this.${this.id}`;
        }

        mustBeKnownSymbol(symbol, this.compileErrors, this.fieldId);

        return this.id;
    }

    get symbolType() {
        return getParentScope(this.scope).resolveSymbol(this.id, this.scope).symbolType;
    }

    toString() {
        return this.id;
    }
}