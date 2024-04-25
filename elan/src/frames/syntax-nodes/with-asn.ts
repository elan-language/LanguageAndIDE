import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";
import { ExprAsn } from "./expr-asn";
import { LiteralListAsn } from "./literal-list-asn";

export class WithAsn implements AstNode {

    constructor(private obj: ExprAsn, private withClause: LiteralListAsn, scope: Scope) {
    }

    compileErrors: CompileError[] = [];

    aggregateCompileErrors(): CompileError[] {
        return this.compileErrors
        .concat(this.obj.aggregateCompileErrors())
        .concat(this.withClause.aggregateCompileErrors());
    }

    compile(): string {
        throw new Error("Method not implemented.");
    }

    get symbolType() {
        return this.obj.symbolType;
    }

    toString() {
        return `With (${this.obj}) (${this.withClause})`;
    }
}