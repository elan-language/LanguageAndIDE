import { StringType } from "../../symbols/string-type";
import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";

export class SegmentedStringAsn implements AstNode {

    constructor(private segments: AstNode[], scope: Scope) {

    }

    compileErrors: CompileError[] = [];

    aggregateCompileErrors(): CompileError[] {
        var cc: CompileError[] = [];
        for (const i of this.segments) {
            cc = cc.concat(i.aggregateCompileErrors());
        }
        return this.compileErrors.concat(cc);
    }

    compile(): string {
        return `\`${this.segments.map(s => s.compile()).join("")}\``;
    }

    get symbolType() {
        return StringType.Instance;
    }

    toString() {
        return this.segments.map(s => `${s}`).join("");
    }
}