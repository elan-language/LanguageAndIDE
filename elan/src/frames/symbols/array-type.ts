import { GenericSymbolType } from "../interfaces/generic-symbol-type";
import { ISymbolType } from "../interfaces/symbol-type";

export class ArrayType implements GenericSymbolType {

    constructor(public readonly ofType: ISymbolType, public readonly is2d : boolean) {

    }

    get name() {
        return `Array <${this.ofType.name}>`;
    }
}