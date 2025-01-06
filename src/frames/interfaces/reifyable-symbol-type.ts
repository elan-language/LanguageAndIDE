import { SymbolType } from "./symbol-type";

export interface ReifyableSymbolType extends SymbolType {
  reify(actutalTypes: SymbolType[]): ReifyableSymbolType;
}
