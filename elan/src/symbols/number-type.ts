import { ISymbolType } from "./symbol-type";

export class NumberType implements ISymbolType {
    private constructor() { }

    static Instance: ISymbolType = new NumberType();
    name = "Number";
}