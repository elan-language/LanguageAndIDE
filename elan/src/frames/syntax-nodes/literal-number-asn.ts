import { NumberType } from "../../symbols/number-type";
import { CompileError } from "../compile-error";
import { AstNode } from "./ast-node";

export class LiteralNumberAsn implements AstNode {
    constructor(rawValue: string) {
        this.value = parseFloat(rawValue.trim());
    }

    compileErrors: CompileError[] = [];

    aggregateCompileErrors(): CompileError[] {
        return this.compileErrors;
    }

    compile(): string {
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