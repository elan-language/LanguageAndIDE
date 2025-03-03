import { SymbolScope } from "../symbols/symbol-scope";
import { SymbolType } from "./symbol-type";
import { Transforms } from "./transforms";

export interface ElanSymbol {
  symbolId: string;
  symbolType(transforms?: Transforms): SymbolType;
  symbolScope: SymbolScope;
}
