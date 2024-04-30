import { BooleanType } from "../../symbols/boolean-type";
import { CompileError } from "../compile-error";
import { mustBeOfType } from "../compile-rules";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "./ast-node";
import { ExprAsn } from "./expr-asn";

export class IfExprAsn extends AbstractAstNode implements AstNode {

    constructor(private condition: ExprAsn, private expr1: ExprAsn, private expr2: ExprAsn, public fieldId: string, scope: Scope) {
        super();
    }

    aggregateCompileErrors(): CompileError[] {
        return this.compileErrors
            .concat(this.condition.aggregateCompileErrors())
            .concat(this.expr1.aggregateCompileErrors())
            .concat(this.expr2.aggregateCompileErrors());
    }

    compile(): string {
        this.compileErrors = [];
        mustBeOfType(this.condition, BooleanType.Instance, this.compileErrors, this.fieldId);
        return `${this.condition.compile()} ? ${this.expr1.compile()} : ${this.expr2.compile()}`;
    }

    get symbolType() {
        return this.expr1.symbolType;
    }

    toString() {
        return `Ternary (${this.condition}) ? (${this.expr1}) : (${this.expr2})`;
    }
}