import { ISymbolType } from "./ISymbolType";

class TupleType implements ISymbolType {

    constructor(private ofTypes: ISymbolType[]) {

    }

    get name() {
        return `Type <${this.ofTypes.map(t => t.name).join(",")}>`;
    }
}