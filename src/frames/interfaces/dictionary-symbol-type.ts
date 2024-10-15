import { SymbolType } from "./symbol-type";

export interface DictionarySymbolType extends SymbolType {
  keyType: SymbolType;
  valueType: SymbolType;
}
