import { BooleanType } from "../../symbols/boolean-type";
import { trueKeyword } from "../keywords";
import { AstNode } from "./ast-node";

export class LiteralBoolAsn implements AstNode {
    constructor(rawValue: string) {
        this.value = rawValue.trim() === trueKeyword;
    }
    renderAsObjectCode(): string {
        throw new Error("Method not implemented.");
    }

    value: boolean;

    get symbolType() {
        return BooleanType.Instance;
    }

    toString() {
        return this.value.toString();
    }
}