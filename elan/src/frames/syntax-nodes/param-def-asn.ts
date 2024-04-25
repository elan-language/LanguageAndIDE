import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";

export class ParamDefAsn implements AstNode {

    constructor(public id: string, private type: AstNode, private scope: Scope) {
    }

    compileErrors: CompileError[] = [];

    aggregateCompileErrors(): CompileError[] {
        return this.compileErrors
        .concat(this.type.aggregateCompileErrors());
    }

    compile(): string {
        return `${this.id}`;
    }

    get symbolType() {
        return this.type.symbolType;
    }

    toString() {
        return `Param ${this.id} : ${this.type}`;
    }
}