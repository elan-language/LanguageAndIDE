
import { DictionaryType } from "../../symbols/dictionary-type";
import { CompileError } from "../compile-error";
import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";
import { KvpAsn } from "./kvp-asn";
import { LiteralListAsn } from "./literal-list-asn";

export class LiteralDictionaryAsn implements AstNode {

    constructor(private readonly list: LiteralListAsn, scope: Scope) {
    }

    compileErrors: CompileError[] = [];

    aggregateCompileErrors(): CompileError[] {
        throw new Error("Method not implemented.");
    }

    compile(): string {
        const items = this.list.items.map(p => p.compile()).join(", ");
        return `{${items}}`;
    }

    get symbolType() {
        const first = this.list.items[0] as KvpAsn;
        return new DictionaryType(first.keySymbolType!, first.symbolType!);
    }

    toString() {
        return `${this.list}`;
    }
}