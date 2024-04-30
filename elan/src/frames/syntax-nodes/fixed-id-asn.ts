import { CompileError } from "../compile-error";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "./ast-node";

export class FixedIdAsn extends AbstractAstNode implements AstNode {

    constructor(private id: string, public fieldId: string) {
        super();
    }

    aggregateCompileErrors(): CompileError[] {
        return this.compileErrors;
    }


    compile(): string {
        this.compileErrors = [];
        return this.id;
    }

    get symbolType() {
        return undefined;
    }

    toString() {
        return this.id;
    }
}