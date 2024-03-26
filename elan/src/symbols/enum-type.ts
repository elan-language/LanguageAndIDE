import { ISymbolType } from "./symbol-type";

export class EnumType implements ISymbolType {

    constructor(private enumName: string) {

    }

    get name() {
        return `Enum ${this.enumName}`;
    }
}