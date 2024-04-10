import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";

export class KvpAsn implements AstNode {

    constructor(private key: AstNode, private value: AstNode, scope: Scope) {
    }

    renderAsObjectCode(): string {
        return `${this.key.renderAsObjectCode()} : ${this.value.renderAsObjectCode()}`;
    }

    get keySymbolType() {
        return this.key.symbolType;
     }

    get symbolType() {
       return this.value.symbolType;
    }

    toString() {
        return `(${this.key}:${this.value})`;
    }
}