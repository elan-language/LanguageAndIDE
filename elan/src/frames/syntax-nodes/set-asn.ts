import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";
import { ExprAsn } from "./expr-asn";


export class SetAsn implements AstNode {

    constructor(private id: string, private to: ExprAsn, scope: Scope) {
        this.id = id.trim();
    }

    compileErrors: CompileError[] = [];

    aggregateCompileErrors(): CompileError[] {
        return this.compileErrors
        .concat(this.to.aggregateCompileErrors());
    }

    compile(): string {
        this.compileErrors = [];
        return `${this.id} = ${this.to}`;
    }

    get symbolType() {
        return this.to.symbolType;
    }

    toString() {
        return `Set (${this.id}) (${this.to})`;
    }
}