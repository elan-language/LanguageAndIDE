import { FloatType } from "../../symbols/float-type";

export class LiteralFloatAsn {
    constructor(rawValue: string) {
        this.value = parseFloat(rawValue.trim());
    }

    value: number;

    get symbolType() {
        return FloatType.Instance;
    }

    toString() {
        return this.value.toString();
    }
}