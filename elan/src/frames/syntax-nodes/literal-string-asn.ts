import { StringType } from "../../symbols/string-type";
import { CompileError } from "../compile-error";
import { AstNode } from "./ast-node";

export class LiteralStringAsn implements AstNode {

    constructor(private value: string) {

    }

    compileErrors: CompileError[] = [];

    aggregateCompileErrors(): CompileError[] {
        return this.compileErrors;
    }

    compile(): string {
        return `${this.value}`;
    }

    get symbolType() {
        return StringType.Instance;
    }

    toString() {
        return this.value;
    }
}