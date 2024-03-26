import { ISymbolType } from "./symbol-type";

export class UnknownType implements ISymbolType {
    private constructor() { }

    static Instance: ISymbolType = new UnknownType();

    name = "Unknown";
}