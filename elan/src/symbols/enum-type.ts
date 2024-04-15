import { ISymbolType } from "./symbol-type";

export class EnumType implements ISymbolType {

    constructor(public readonly name: string) {

    }

    toString() {
        return `Enum ${this.name}`;
    }
}