import { ElanSymbol } from "./elan-symbol";
import { SymbolType } from "./symbol-type";

export interface ClassSymbol extends ElanSymbol {
  isClass?: boolean;
  ofTypes: SymbolType[];
  abstract: boolean;
  notInheritable: boolean;
}
