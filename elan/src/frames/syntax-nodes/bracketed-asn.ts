import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "./ast-node";
import { ExprAsn } from "./expr-asn";

export class BracketedAsn extends AbstractAstNode implements AstNode {

    constructor(private readonly body: ExprAsn, public readonly fieldId: string, private readonly scope: Scope) {
        super();
    }

    aggregateCompileErrors(): CompileError[] {
        return this.compileErrors.concat(this.body.aggregateCompileErrors());
    }

    compile(): string {
        this.compileErrors = [];
        return `(${this.body.compile()})`;
    }

    symbolType() {
        return this.body.symbolType();
    }

    toString() {
        return `(${this.body})`;
    }
}