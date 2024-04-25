import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";

export class DeconstructedListAsn implements AstNode {

    constructor(private head: string, private tail: string, scope: Scope) {
    }

    compileErrors: CompileError[] = [];

    aggregateCompileErrors(): CompileError[] {
        throw new Error("Method not implemented.");
    }

    compile(): string {
        throw new Error("Method not implemented.");
    }

    get symbolType() {
        return { name: "" };
    }

    toString() {
        return `[${this.head}:${this.tail}]`;
    }
}