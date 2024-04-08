import { FloatType } from "../../symbols/float-type";
import { AstNode } from "./ast-node";

export class LiteralFloatAsn implements AstNode {
    constructor(rawValue: string) {
        this.value = parseFloat(rawValue.trim());
    }
    renderAsObjectCode(): string {
        return this.value.toString();
    }

    value: number;

    get symbolType() {
        return FloatType.Instance;
    }

    toString() {
        return this.value.toString();
    }
}