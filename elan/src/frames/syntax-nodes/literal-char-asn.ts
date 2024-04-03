import { CharType } from "../../symbols/char-type";

export class LiteralCharAsn {
    constructor(rawValue: string) {
        this.value = rawValue.trim();
    }

    value: string;

    get symbolType() {
        return CharType.Instance;
    }

    toString() {
        return this.value;
    }
}