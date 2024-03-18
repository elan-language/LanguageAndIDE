import { ISymbolType } from "./ISymbolType";

class ArrayType implements ISymbolType {

    constructor(private ofType: ISymbolType) {

    }

    get name() {
        return `List <${this.ofType.name}>`;
    }
}