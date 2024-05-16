import { ElanSymbol } from "../interfaces/symbol";
import { SymbolScope } from "./symbol-scope";
import { UnknownType } from "./unknown-type";

export class UnknownSymbol implements ElanSymbol {
    private constructor() { }
    symbolId = "";
    symbolType = () => UnknownType.Instance;;
    symbolScope = SymbolScope.unknown;

    static Instance: ElanSymbol = new UnknownSymbol();

    name = "Unknown Symbol";
}