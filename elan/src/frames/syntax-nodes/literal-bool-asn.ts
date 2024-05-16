import { BooleanType } from "../symbols/boolean-type";
import { CompileError } from "../compile-error";
import { trueKeyword } from "../keywords";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "../interfaces/ast-node";

export class LiteralBoolAsn extends AbstractAstNode implements AstNode {
    constructor(rawValue: string, public readonly fieldId: string) {
        super();
        this.value = rawValue.trim() === trueKeyword;
    }

    aggregateCompileErrors(): CompileError[] {
        return this.compileErrors;
    }

    compile(): string {
        this.compileErrors = [];
        return this.value ? "true" : "false";
    }

    value: boolean;

    symbolType() {
        return BooleanType.Instance;
    }

    toString() {
        return this.value.toString();
    }
}