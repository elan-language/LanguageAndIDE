import { UnknownType } from "../../symbols/unknown-type";
import { CompileError } from "../compile-error";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstIdNode } from "../interfaces/ast-id-node";

export class FixedIdAsn extends AbstractAstNode implements AstIdNode {

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

    symbolType() {
        return UnknownType.Instance;
    }

    toString() {
        return this.id;
    }
}