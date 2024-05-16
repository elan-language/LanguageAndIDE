import { SymbolType } from "../interfaces/symbol-type";

export class EnumType implements SymbolType {

    constructor(public readonly name: string) {

    }

    toString() {
        return `Enum ${this.name}`;
    }
}