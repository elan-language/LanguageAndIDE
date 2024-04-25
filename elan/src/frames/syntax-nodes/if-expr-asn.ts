import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";
import { ExprAsn } from "./expr-asn";

export class IfExprAsn implements AstNode {

    constructor(private condition: ExprAsn, private expr1: ExprAsn, private expr2: ExprAsn, scope: Scope) {
    }

    compileErrors: CompileError[] = [];

    aggregateCompileErrors(): CompileError[] {
        return this.compileErrors
        .concat(this.condition.aggregateCompileErrors())
        .concat(this.expr1.aggregateCompileErrors())
        .concat(this.expr2.aggregateCompileErrors());
    }

    compile(): string {
        return `${this.condition.compile()} ? ${this.expr1.compile()} : ${this.expr2.compile()}`;
    }

    get symbolType() {
        return this.expr1.symbolType;
    }

    toString() {
        return `Ternary (${this.condition}) ? (${this.expr1}) : (${this.expr2})`;
    }
}