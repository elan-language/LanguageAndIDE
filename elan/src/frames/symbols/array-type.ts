import { ISymbolType } from "./symbol-type";

export class ArrayType implements ISymbolType {

    constructor(public readonly ofType: ISymbolType, public readonly is2d : boolean) {

    }

    get name() {
        return `Array <${this.ofType.name}>`;
    }
}