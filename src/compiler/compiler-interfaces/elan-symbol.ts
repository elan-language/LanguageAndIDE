import { SymbolScope } from "../symbols/symbol-scope";
import { SymbolType } from "./symbol-type";

export interface ElanSymbol {
  symbolId: string;
  symbolType(): SymbolType;
  symbolScope: SymbolScope;
}
