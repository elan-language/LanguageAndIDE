import { ISymbolType } from "./symbol-type";

export class EnumValueType implements ISymbolType {

    constructor(public readonly owner: string, public readonly name: string) {

    }

    toString() {
        return `EnumValue ${this.owner}.${this.name}`;
    }
}