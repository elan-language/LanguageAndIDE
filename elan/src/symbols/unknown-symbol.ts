import { ISymbol, SymbolScope } from "./symbol";
import { ISymbolType } from "./symbol-type";

export class UnknownSymbol implements ISymbol {
    private constructor() { }
    symbolId = "";
    symbolType = undefined;
    symbolScope = undefined;

    static Instance: ISymbol = new UnknownSymbol();

    name = "Unknown Symbol";
}