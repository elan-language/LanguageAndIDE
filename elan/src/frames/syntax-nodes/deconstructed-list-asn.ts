import { Scope } from "../interfaces/scope";

export class DeconstructedListAsn {
    
    constructor(private head : string, private tail : string,  scope : Scope) {
    }

    get symbolType() {
        return {name : ""};
    }

    toString() {
        return `[${this.head}:${this.tail}]`;
    }
}