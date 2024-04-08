import { EnumType } from "../../symbols/enum-type";
import { Scope } from "../interfaces/scope";

export class LiteralEnumAsn {
    constructor(private value: string, private type: EnumType, scope: Scope) {

    }

    get symbolType() {
        return this.type;
    }

    toString() {
        return `(${this.type.name}).${this.value}`;
    }
}