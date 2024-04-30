import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "./ast-node";
import { ExprAsn } from "./expr-asn";
import { LambdaSigAsn } from "./lambda-sig-asn";

export class LambdaAsn extends AbstractAstNode implements AstNode {

    constructor(private signature: LambdaSigAsn, private body: ExprAsn, public fieldId: string, private scope: Scope) {
        super();
    }

    aggregateCompileErrors(): CompileError[] {
        return this.compileErrors
            .concat(this.signature.aggregateCompileErrors())
            .concat(this.body.aggregateCompileErrors());
    }

    compile(): string {
        this.compileErrors = [];
        throw new Error("Method not implemented.");
    }

    get symbolType() {
        return this.body.symbolType;
    }

    toString() {
        return `Lambda (${this.signature}) => (${this.body})`;
    }
}