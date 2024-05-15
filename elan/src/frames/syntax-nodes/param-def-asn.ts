import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "./ast-node";
import { AstIdNode } from "./ast-id-node";

export class ParamDefAsn extends AbstractAstNode implements AstIdNode {

    constructor(public readonly id: string, private readonly type: AstNode, public readonly fieldId: string, scope: Scope) {
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

    symbolType() {
        return this.type.symbolType();
    }

    toString() {
        return `Param ${this.id} : ${this.type}`;
    }
}