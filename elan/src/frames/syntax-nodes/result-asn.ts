import { Scope } from "../interfaces/scope";

export class ResultAsn {

    constructor(private scope : Scope) {
        
    }

    get symbolType() {
        return undefined;
    }

    toString() {
        return "Result";
    }
}