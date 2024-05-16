import { Transforms } from "../syntax-nodes/transforms";
import { SymbolScope } from "./symbol-scope";
import { ISymbolType } from "./symbol-type";

export interface ISymbol {
    symbolId: string;
    symbolType(transforms : Transforms): ISymbolType;
    symbolScope? : SymbolScope;
}