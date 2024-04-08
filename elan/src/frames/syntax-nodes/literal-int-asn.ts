import { IntType } from "../../symbols/int-type";
import { AstNode } from "./ast-node";

export class LiteralIntAsn implements AstNode {
    constructor(rawValue: string) {
        this.value = parseInt(rawValue.trim());
    }
    renderAsObjectCode(): string {
        throw new Error("Method not implemented.");
    }

    value: number;

    get symbolType() {
        return IntType.Instance;
    }

    toString() {
        return this.value.toString();
    }
}