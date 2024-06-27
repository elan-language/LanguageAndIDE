import { Transforms } from "../syntax-nodes/transforms";
import { SymbolScope } from "../symbols/symbol-scope";
import { SymbolType } from "./symbol-type";

export interface ElanSymbol {
  symbolId: string;
  symbolType(transforms?: Transforms): SymbolType;
  symbolScope: SymbolScope;
}
