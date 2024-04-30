import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "./ast-node";
import { TypeAsn } from "./type-asn";

export class DefaultTypeAsn extends AbstractAstNode implements AstNode {

    constructor(private type: TypeAsn, public fieldId: string, private scope: Scope) {
        super();
    }

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