import { ISymbolType } from "./symbol-type";

export class IterType implements ISymbolType {

    constructor(public readonly ofType: ISymbolType) {

    }

    get name() {
        return `Iter <${this.ofType.name}>`;
    }
}