import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "./ast-node";

export class ResultAsn extends AbstractAstNode implements AstNode {

    constructor(public readonly fieldId: string, scope: Scope) {
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
        return undefined;
    }

    toString() {
        return "Result";
    }
}