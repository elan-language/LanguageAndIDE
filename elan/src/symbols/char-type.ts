import { ISymbolType } from "./symbol-type";

export class CharType implements ISymbolType {
    private constructor() { }

    static Instance : ISymbolType = new CharType();

    name = "Char";
}