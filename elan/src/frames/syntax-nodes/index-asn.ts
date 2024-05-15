import { UnknownType } from "../../symbols/unknown-type";
import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "./ast-node";
import { ExprAsn } from "./expr-asn";
import { RangeAsn } from "./range-asn";

export class IndexAsn extends AbstractAstNode implements AstNode {

    constructor(public readonly index1: ExprAsn, public readonly index2: ExprAsn | undefined,  public readonly fieldId: string, scope: Scope) {
        super();
    }

    aggregateCompileErrors(): CompileError[] {
        return this.compileErrors
            .concat(this.index1.aggregateCompileErrors());
    }

    isDoubleIndex() {
        return this.index1 instanceof IndexAsn;
    }

    compile(): string {
        this.compileErrors = [];
        if (this.index1 instanceof RangeAsn || this.index1 instanceof IndexAsn) {
            return `${this.index1.compile()}`;
        }

        if (this.index2) {
            return `[${this.index1.compile()}][${this.index2.compile()}]`;
        }

        return `[${this.index1.compile()}]`;
    }

    symbolType() {
        return UnknownType.Instance;;
    }

    toString() {
        if (this.isDoubleIndex()) {
            return `${this.index1}`;
        }
        if (this.index2) {
            return `[${this.index1}][${this.index2}]`;
        }
        return `[${this.index1}]`;
    }
}