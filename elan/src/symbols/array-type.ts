import { ISymbolType } from "./symbol-type";

export class ArrayType implements ISymbolType {

    constructor(private ofType: ISymbolType) {

    }

    get name() {
        return `Array <${this.ofType.name}>`;
    }
}