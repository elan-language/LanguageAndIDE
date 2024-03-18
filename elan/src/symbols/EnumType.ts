import { ISymbolType } from "./ISymbolType";

class EnumType implements ISymbolType {

    constructor(private enumName: string) {

    }

    get name() {
        return `Enum ${this.enumName}`;
    }
}