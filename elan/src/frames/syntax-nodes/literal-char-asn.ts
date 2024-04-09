import { CharType } from "../../symbols/char-type";
import { AstNode } from "./ast-node";

export class LiteralCharAsn implements AstNode {
    constructor(rawValue: string) {
        this.value = rawValue.trim();
    }
    renderAsObjectCode(): string {
        return this.value;
    }

    value: string;

    get symbolType() {
        return CharType.Instance;
    }

    toString() {
        return this.value;
    }
}