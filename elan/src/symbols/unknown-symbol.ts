import { ISymbol } from "./symbol";
import { UnknownType } from "./unknown-type";

export class UnknownSymbol implements ISymbol {
    private constructor() { }
    symbolId = "";
    symbolType = UnknownType.Instance;;
    symbolScope = undefined;

    static Instance: ISymbol = new UnknownSymbol();

    name = "Unknown Symbol";
}