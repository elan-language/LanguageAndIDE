import { ISymbolType } from "./symbol-type";

export class FloatType implements ISymbolType {
    private constructor() { }

    static Instance : ISymbolType = new FloatType();
    name = "Float";
}