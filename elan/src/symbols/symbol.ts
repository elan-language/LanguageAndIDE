import { Transforms } from "../frames/syntax-nodes/transforms";
import { ISymbolType } from "./symbol-type";

export enum SymbolScope {
    external, 
    system, 
    stdlib,
    program, // also undefined 
    parameter,
    property,
    member,
    local,
    counter
}

export interface ISymbol {
    symbolId: string;
    symbolType(transforms : Transforms): ISymbolType;
    symbolScope? : SymbolScope;
}