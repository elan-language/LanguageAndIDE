import { UnknownType } from "../../symbols/unknown-type";
import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "./ast-node";
import { ExprAsn } from "./expr-asn";
import { RangeAsn } from "./range-asn";

export class IndexAsn extends AbstractAstNode implements AstNode {

    constructor(public readonly index: ExprAsn, public readonly fieldId: string, scope: Scope) {
        super();
    }

    aggregateCompileErrors(): CompileError[] {
        return this.compileErrors
            .concat(this.index.aggregateCompileErrors());
    }

    compile(): string {
        this.compileErrors = [];
        if (this.index instanceof RangeAsn) {
            return `${this.index.compile()}`;
        }

        return `[${this.index.compile()}]`;
    }

    get symbolType() {
        return UnknownType.Instance;;
    }

    toString() {
        return `[${this.index}]`;
    }
}