import { ISymbolType } from "./symbol-type";

export class GenericParameterType implements ISymbolType {

    constructor(public id: string) {

    }

    get name() {
        return `Generic Parameter ${this.id}`;
    }
}