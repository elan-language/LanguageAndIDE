import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";

export class CsvAsn implements AstNode {

    constructor(public readonly items: AstNode[], scope: Scope) {
    }

    compileErrors: CompileError[] = [];

    aggregateCompileErrors(): CompileError[] {
        var cc: CompileError[] = [];
        for (const i of this.items) {
            cc = cc.concat(i.aggregateCompileErrors());
        }
        return this.compileErrors.concat(cc);
    }

    compile(): string {
        const it = this.items.map(p => p.compile()).join(", ");
        return `${it}`;
    }

    get symbolType() {
        return undefined;
    }

    toString() {
        const it = this.items.map(p => p.toString()).join(", ");
        return `${it}`;
    }
}