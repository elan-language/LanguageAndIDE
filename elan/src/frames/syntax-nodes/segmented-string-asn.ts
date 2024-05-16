import { StringType } from "../../symbols/string-type";
import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AbstractAstNode } from "./abstract-ast-node";
import { AstNode } from "../interfaces/ast-node";

export class SegmentedStringAsn extends AbstractAstNode implements AstNode {

    constructor(private readonly segments: AstNode[], public readonly fieldId: string, scope: Scope) {
        super();
    }

    aggregateCompileErrors(): CompileError[] {
        var cc: CompileError[] = [];
        for (const i of this.segments) {
            cc = cc.concat(i.aggregateCompileErrors());
        }
        return this.compileErrors.concat(cc);
    }

    compile(): string {
        this.compileErrors = [];
        return `\`${this.segments.map(s => s.compile()).join("")}\``;
    }

    symbolType() {
        return StringType.Instance;
    }

    toString() {
        return this.segments.map(s => `${s}`).join("");
    }
}