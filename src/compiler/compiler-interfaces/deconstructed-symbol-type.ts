import { SymbolType } from "./symbol-type";

export interface DeconstructedSymbolType extends SymbolType {
  symbolTypeFor(id: string): SymbolType;
}
