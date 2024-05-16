import { SymbolType } from "./symbol-type";

export interface GenericSymbolType extends SymbolType {
    ofType : SymbolType; 
}