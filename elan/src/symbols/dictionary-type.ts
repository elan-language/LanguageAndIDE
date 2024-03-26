import { ISymbolType } from "./symbol-type";

export class DictionaryType implements ISymbolType {

    constructor(private keyType: ISymbolType, private valueType: ISymbolType) {

    }

    get name() {
        return `Dictionary <${this.keyType.name},${this.valueType.name}>`;
    }
}