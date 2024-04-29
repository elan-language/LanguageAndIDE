import { ListType } from "../../symbols/list-type";
import { UnknownType } from "../../symbols/unknown-type";
import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";

export class LiteralListAsn implements AstNode {

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
        this.compileErrors = [];
        const it = this.items.map(p => p.compile()).join(", ");
        return `system.list([${it}])`;
    }

    get symbolType() {
        const ofType = this.items[0]?.symbolType;
        if (ofType) {
            return new ListType(ofType);
        }
        return new ListType(UnknownType.Instance);
    }

    toString() {
        const it = this.items.map(p => p.toString()).join(", ");
        return `[${it}]`;
    }
}