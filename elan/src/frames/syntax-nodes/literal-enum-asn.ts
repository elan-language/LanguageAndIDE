import { EnumType } from "../../symbols/enum-type";
import { Scope } from "../interfaces/scope";
import { AstNode } from "./ast-node";

export class LiteralEnumAsn implements AstNode {
    constructor(private value: string, private type: EnumType, scope: Scope) {

    }
    renderAsObjectCode(): string {
        throw new Error("Method not implemented.");
    }

    get symbolType() {
        return this.type;
    }

    toString() {
        return `(${this.type.name}).${this.value}`;
    }
}