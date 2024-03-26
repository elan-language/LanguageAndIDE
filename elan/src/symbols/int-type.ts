import { ISymbolType } from "./symbol-type";

export class IntType implements ISymbolType {
    private constructor() { }

    static Instance : ISymbolType = new IntType();

    name = "Int";
}