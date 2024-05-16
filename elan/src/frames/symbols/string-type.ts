import { SymbolType } from "../interfaces/symbol-type";

export class StringType implements SymbolType {
    private constructor() { }

    static Instance: SymbolType = new StringType();

    name = "String";
}