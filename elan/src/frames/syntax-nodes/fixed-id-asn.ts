import { UnknownType } from "../../symbols/unknown-type";
import { CompileError } from "../compile-error";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "./ast-node";

export class FixedIdAsn extends AbstractAstNode implements AstNode {

    constructor(public readonly id: string, public readonly fieldId: string) {
        super();
    }

    aggregateCompileErrors(): CompileError[] {
        return this.compileErrors;
    }


    compile(): string {
        this.compileErrors = [];
        return this.id;
    }

    get symbolType() {
        return UnknownType.Instance;
    }

    toString() {
        return this.id;
    }
}