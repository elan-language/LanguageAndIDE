import { StringType } from "../../symbols/string-type";
import { AstNode } from "./ast-node";

export class LiteralStringAsn implements AstNode {
    
    constructor(rawValue: string) {
        this.value = rawValue.trim();
    }
    renderAsObjectCode(): string {
        throw new Error("Method not implemented.");
    }

    value: string;

    get symbolType() {
        return StringType.Instance;
    }

    toString() {
        return this.value;
    }
}