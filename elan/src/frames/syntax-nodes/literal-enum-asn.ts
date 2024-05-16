import { EnumType } from "../../symbols/enum-type";
import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "../interfaces/ast-node";

export class LiteralEnumAsn extends AbstractAstNode implements AstNode {

    constructor(private readonly value: string, private readonly type: EnumType, public readonly fieldId: string, scope: Scope) {
        super();
    }

    aggregateCompileErrors(): CompileError[] {
        return this.compileErrors;
    }

    compile(): string {
        this.compileErrors = [];
        return `${this.type.name}.${this.value}`;
    }

    symbolType() {
        return this.type;
    }

    toString() {
        return `(${this.type.name}).${this.value}`;
    }
}