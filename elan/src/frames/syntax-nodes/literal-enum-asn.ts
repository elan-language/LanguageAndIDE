import { EnumType } from "../../symbols/enum-type";
import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";

export class LiteralEnumAsn implements AstNode {
    constructor(private value: string, private type: EnumType, scope: Scope) {

    }

    compileErrors: CompileError[] = [];

    aggregateCompileErrors(): CompileError[] {
        throw new Error("Method not implemented.");
    }

    compile(): string {
        return `${this.type.name}.${this.value}`;
    }

    get symbolType() {
        return this.type;
    }

    toString() {
        return `(${this.type.name}).${this.value}`;
    }
}