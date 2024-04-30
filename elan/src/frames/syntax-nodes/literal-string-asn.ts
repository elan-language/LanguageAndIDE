import { StringType } from "../../symbols/string-type";
import { CompileError } from "../compile-error";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "./ast-node";

export class LiteralStringAsn extends AbstractAstNode implements AstNode {

    constructor(private value: string, public fieldId: string) {
        super();
    }

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