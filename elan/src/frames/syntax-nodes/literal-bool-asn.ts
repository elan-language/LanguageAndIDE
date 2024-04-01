import { BooleanType } from "../../symbols/boolean-type";
import { trueKeyword } from "../keywords";

export class LiteralBoolAsn {
    constructor(rawValue : string) {
        this.value = rawValue.trim() === trueKeyword;
    }

    value : boolean;

    get symbolType() {
        return BooleanType.Instance;
    }

    toString() {
        return this.value.toString();
    }
}