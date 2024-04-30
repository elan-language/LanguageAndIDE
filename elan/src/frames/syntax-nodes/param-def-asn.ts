import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "./ast-node";

export class ParamDefAsn extends AbstractAstNode implements AstNode {

    constructor(public id: string, private type: AstNode, public fieldId: string, private scope: Scope) {
        super();
    }

    aggregateCompileErrors(): CompileError[] {
        return this.compileErrors
            .concat(this.type.aggregateCompileErrors());
    }

    compile(): string {
        this.compileErrors = [];
        return `${this.id}`;
    }

    get symbolType() {
        return this.type.symbolType;
    }

    toString() {
        return `Param ${this.id} : ${this.type}`;
    }
}