import { IntType } from "../../symbols/int-type";
import { CompileError } from "../compile-error";
import { AstNode } from "./ast-node";

export class LiteralIntAsn implements AstNode {
    constructor(rawValue: string) {
        this.value = parseInt(rawValue.trim());
    }

    compileErrors: CompileError[] = [];

    aggregateCompileErrors(): CompileError[] {
        throw new Error("Method not implemented.");
    }

    compile(): string {
        return this.value.toString();
    }

    value: number;

    get symbolType() {
        return IntType.Instance;
    }

    toString() {
        return this.value.toString();
    }
}