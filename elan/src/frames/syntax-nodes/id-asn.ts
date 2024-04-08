import { Scope } from "../interfaces/scope";

export class IdAsn {

    constructor(private id: string, private scope : Scope) {
        this.id = id.trim();
    }

    get symbolType() {
        return this.scope.resolveSymbol(this.id, this.scope).symbolType;
    }

    toString() {
        return this.id;
    }
}