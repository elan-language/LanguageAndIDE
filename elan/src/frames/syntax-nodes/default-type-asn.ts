import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";
import { TypeAsn } from "./type-asn";

export class DefaultTypeAsn implements AstNode {

    constructor(private type: TypeAsn, private scope: Scope) {
    }

    compileErrors: CompileError[] = [];

    aggregateCompileErrors(): CompileError[] {
        return this.compileErrors.concat(this.type.aggregateCompileErrors());
    }

    compile(): string {
        this.compileErrors = [];
        return this.type.renderAsDefaultObjectCode();
    }

    get symbolType() {
        return this.type.symbolType;
    }

    toString() {
        return `Default (${this.type})`;
    }
}