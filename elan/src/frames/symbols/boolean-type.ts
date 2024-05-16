import { ISymbolType } from "../interfaces/symbol-type";

export class BooleanType implements ISymbolType {
    private constructor() { }

    static Instance: ISymbolType = new BooleanType();

    name = "Boolean";
}