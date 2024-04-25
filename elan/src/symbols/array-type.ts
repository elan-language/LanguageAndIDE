import { ISymbolType } from "./symbol-type";

export class ArrayType implements ISymbolType {

    constructor(public readonly ofType: ISymbolType) {

    }

    get name() {
        return `Array <${this.ofType.name}>`;
    }
}