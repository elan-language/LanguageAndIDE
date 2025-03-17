import { SymbolType } from "./symbol-type";

export interface ReifyableSymbolType extends SymbolType {
  reify(actualTypes: SymbolType[]): ReifyableSymbolType;
  ofTypes: SymbolType[];
}
