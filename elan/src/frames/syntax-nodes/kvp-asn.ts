import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";

export class KvpAsn implements AstNode {

    constructor(private key: AstNode, private value: AstNode, scope: Scope) {
    }

    compileErrors: CompileError[] = [];

    aggregateCompileErrors(): CompileError[] {
        return this.compileErrors
        .concat(this.key.aggregateCompileErrors())
        .concat(this.value.aggregateCompileErrors());
    }

    compile(): string {
        this.compileErrors = [];
        return `${this.key.compile()} : ${this.value.compile()}`;
    }

    get keySymbolType() {
        return this.key.symbolType;
    }

    get symbolType() {
        return this.value.symbolType;
    }

    toString() {
        return `(${this.key}:${this.value})`;
    }
}