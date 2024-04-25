import { ISymbolType } from "./symbol-type";

export class DictionaryType implements ISymbolType {

    constructor(public readonly keyType: ISymbolType, public readonly valueType: ISymbolType) {

    }

    get name() {
        return `Dictionary <${this.keyType.name},${this.valueType.name}>`;
    }
}