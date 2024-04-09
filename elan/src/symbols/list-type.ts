import { ISymbolType } from "./symbol-type";

export class ListType implements ISymbolType {

    constructor(public readonly ofType: ISymbolType) {

    }

    get name() {
        return `List <${this.ofType.name}>`;
    }
}