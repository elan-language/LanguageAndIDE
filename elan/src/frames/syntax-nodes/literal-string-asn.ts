import { StringType } from "../../symbols/string-type";

export class LiteralStringAsn {
    
    constructor(rawValue: string) {
        this.value = rawValue.trim();
    }

    value: string;

    get symbolType() {
        return StringType.Instance;
    }

    toString() {
        return this.value;
    }
}