import { GenericSymbolType } from "../interfaces/generic-symbol-type";
import { ISymbolType } from "../interfaces/symbol-type";

export class IterType implements GenericSymbolType {

    constructor(public readonly ofType: ISymbolType) {

    }

    get name() {
        return `Iter <${this.ofType.name}>`;
    }
}