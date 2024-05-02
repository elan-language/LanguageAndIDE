import { ISymbolType } from "./symbol-type";

export enum SymbolScope {
    external, 
    system, 
    stdlib,
    program, // also undefined 
    parameter,
    property,
    member,
    local
}

export interface ISymbol {
    symbolId: string;
    symbolType?: ISymbolType;
    symbolScope? : SymbolScope;
}