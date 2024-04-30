import { NumberType } from "../../symbols/number-type";
import { CompileError } from "../compile-error";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "./ast-node";

export class LiteralNumberAsn extends AbstractAstNode implements AstNode {

    constructor(rawValue: string, public fieldId: string,) {
        super();
        this.value = parseFloat(rawValue.trim());
    }

    aggregateCompileErrors(): CompileError[] {
        return this.compileErrors;
    }

    compile(): string {
        this.compileErrors = [];
        return this.value.toString();
    }

    value: number;

    get symbolType() {
        return NumberType.Instance;
    }

    toString() {
        return this.value.toString();
    }
}