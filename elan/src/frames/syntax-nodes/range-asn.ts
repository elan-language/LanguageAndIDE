import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";

export class RangeAsn implements AstNode {

    constructor(private from: AstNode | undefined, private to: AstNode | undefined, private scope: Scope) {

    }

    compileErrors: CompileError[] = [];

    aggregateCompileErrors(): CompileError[] {
        throw new Error("Method not implemented.");
    }


    compile(): string {
        const f = this.from ? `${this.from.compile()}` : "0";
        const t = this.to ? `${this.to.compile()}` : undefined;

        if (t) {
            return `.slice(${f}, ${t})`;
        }
        return `.slice(${f})`;
    }

    get symbolType() {
        return undefined;
    }

    toString() {
        const f = this.from ? `${this.from}` : "";
        const t = this.to ? `${this.to}` : "";
        return `Range ${f}..${t}`;
    }
}