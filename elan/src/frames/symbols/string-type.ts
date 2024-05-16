import { ISymbolType } from "../interfaces/symbol-type";

export class StringType implements ISymbolType {
    private constructor() { }

    static Instance: ISymbolType = new StringType();

    name = "String";
}