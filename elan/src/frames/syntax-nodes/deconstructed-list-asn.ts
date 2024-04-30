import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "./ast-node";

export class DeconstructedListAsn extends AbstractAstNode implements AstNode {

    constructor(private head: string, private tail: string, public fieldId: string, scope: Scope) {
        super();
    }

    aggregateCompileErrors(): CompileError[] {
        return this.compileErrors;
    }

    compile(): string {
        this.compileErrors = [];
        throw new Error("Method not implemented.");
    }

    get symbolType() {
        return { name: "" };
    }

    toString() {
        return `[${this.head}:${this.tail}]`;
    }
}