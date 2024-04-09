import { DictionaryType } from "../../symbols/dictionary-type";
import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";
import { KvpAsn } from "./kvp-asn";
import { LiteralListAsn } from "./literal-list-asn";

export class LiteralDictionaryAsn implements AstNode {
    
    constructor(private readonly list: LiteralListAsn, scope : Scope) {
    }
    renderAsObjectCode(): string {
        var lst = this.list.renderAsObjectCode();
        return `new Map(${lst})`;
    }

    get symbolType() {
        const first = this.list.items[0] as KvpAsn;
        return new DictionaryType(first.keySymbolType!, first.symbolType!);
    }

    toString() {
        return `${this.list}`;
    }
}