import { BooleanType } from "../../symbols/boolean-type";
import { trueKeyword } from "../keywords";
import { AstNode } from "./ast-node";

export class LiteralBoolAsn implements AstNode {
    constructor(rawValue: string) {
        this.value = rawValue.trim() === trueKeyword;
    }
    compile(): string {
        return this.value ? "true" : "false";
    }

    value: boolean;

    get symbolType() {
        return BooleanType.Instance;
    }

    toString() {
        return this.value.toString();
    }
}