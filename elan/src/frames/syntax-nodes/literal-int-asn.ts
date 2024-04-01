import { IntType } from "../../symbols/int-type";

export class LiteralIntAsn {
    constructor(rawValue: string) {
        this.value = parseInt(rawValue.trim());
    }

    value: number;

    get symbolType() {
        return IntType.Instance;
    }

    toString() {
        return this.value.toString();
    }
}