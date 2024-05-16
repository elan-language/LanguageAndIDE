import { ISymbol } from "../interfaces/symbol";
import { SymbolScope } from "./symbol-scope";
import { UnknownType } from "./unknown-type";

export class UnknownSymbol implements ISymbol {
    private constructor() { }
    symbolId = "";
    symbolType = () => UnknownType.Instance;;
    symbolScope = SymbolScope.unknown;

    static Instance: ISymbol = new UnknownSymbol();

    name = "Unknown Symbol";
}