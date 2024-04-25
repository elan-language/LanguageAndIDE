import { CompileError } from "../compile-error";
import { AstNode } from "./ast-node";

export class FixedIdAsn implements AstNode {

    constructor(private id: string,) {
    }

    compileErrors: CompileError[] = [];

    aggregateCompileErrors(): CompileError[] {
        throw new Error("Method not implemented.");
    }


    compile(): string {
        return this.id;
    }

    get symbolType() {
        return undefined;
    }

    toString() {
        return this.id;
    }
}