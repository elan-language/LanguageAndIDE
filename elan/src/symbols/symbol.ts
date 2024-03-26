import { ISymbolType } from "./symbol-type";

export interface ISymbol {
    symbolId: string;
    symbolType?: ISymbolType;
}