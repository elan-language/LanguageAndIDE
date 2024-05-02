import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { globalKeyword } from "../keywords";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "./ast-node";

export class QualifierAsn extends AbstractAstNode implements AstNode {

    constructor(public value: AstNode, public fieldId: string, private scope: Scope) {
        super();
    }

    compileErrors: CompileError[] = [];

    aggregateCompileErrors(): CompileError[] {
        var cc: CompileError[] = [];
        const q = this.value.aggregateCompileErrors();
        return this.compileErrors.concat(q);
    }

    compile(): string {
        const s = this.compileAsParameter();
        return s === "" ? "" : `${s}.`;
    }

    compileAsParameter(): string {
        this.compileErrors = [];
        const s = this.value.compile();

        if (s === globalKeyword) {
            return "";
        }

        return `${s}`;
    }

    get symbolType() {
        return this.scope.resolveSymbol(this.value.compile(), this.scope)?.symbolType;
    }

    toString() {
        const s = this.value.toString();

        if (s === globalKeyword) {
            return "";
        }

        return `${s}.`;
    }
}