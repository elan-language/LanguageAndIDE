import { GenericSymbolType } from "../interfaces/generic-symbol-type";
import { ISymbolType } from "../interfaces/symbol-type";

export class ListType implements GenericSymbolType {

    constructor(public readonly ofType: ISymbolType) {

    }

    get name() {
        return `List <${this.ofType.name}>`;
    }
}