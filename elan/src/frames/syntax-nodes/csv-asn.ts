import { UnknownType } from "../../symbols/unknown-type";
import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "./ast-node";

export class CsvAsn extends AbstractAstNode implements AstNode {

    constructor(public readonly items: AstNode[], public readonly fieldId: string, scope: Scope) {
        super();
    }

    aggregateCompileErrors(): CompileError[] {
        var cc: CompileError[] = [];
        for (const i of this.items) {
            cc = cc.concat(i.aggregateCompileErrors());
        }
        return this.compileErrors.concat(cc);
    }

    compile(): string {
        this.compileErrors = [];
        const it = this.items.map(p => p.compile()).join(", ");
        return `${it}`;
    }

    get symbolType() {
        return UnknownType.Instance;
    }

    toString() {
        const it = this.items.map(p => p.toString()).join(", ");
        return `${it}`;
    }
}