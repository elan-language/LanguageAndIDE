import { FloatType } from "../../symbols/float-type";
import { AstNode } from "./ast-node";

export class LiteralFloatAsn implements AstNode {
    constructor(rawValue: string) {
        this.value = parseFloat(rawValue.trim());
    }
    renderAsObjectCode(): string {
        throw new Error("Method not implemented.");
    }

    value: number;

    get symbolType() {
        return FloatType.Instance;
    }

    toString() {
        return this.value.toString();
    }
}