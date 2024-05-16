import { ISymbolType } from "./symbol-type";

export interface GenericSymbolType extends ISymbolType {
    ofType : ISymbolType; 
}