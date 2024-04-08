import { CharType } from "../../symbols/char-type";
import { AstNode } from "./ast-node";

export class LiteralCharAsn implements AstNode {
    constructor(rawValue: string) {
        this.value = rawValue.trim();
    }
    renderAsObjectCode(): string {
        throw new Error("Method not implemented.");
    }

    value: string;

    get symbolType() {
        return CharType.Instance;
    }

    toString() {
        return this.value;
    }
}