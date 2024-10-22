import { Transforms } from "../syntax-nodes/transforms";
import { ElanSymbol } from "./elan-symbol";
import { Scope } from "./scope";
import { SymbolType } from "./symbol-type";

export interface Class extends Scope, ElanSymbol {
  genericParamMatches: Map<string, SymbolType>;
  getChildren(): ElanSymbol[];
  resolveOwnSymbol(id: string, transforms: Transforms): ElanSymbol;
  ofTypes: SymbolType[];
  abstract: boolean;
}
