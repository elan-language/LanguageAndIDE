import { ElanSymbol } from "../compiler-interfaces/elan-symbol";
import { SymbolScope } from "./symbol-scope";
import { UnknownType } from "./unknown-type";

export class UnknownSymbol implements ElanSymbol {
  constructor(id?: string) {
    this.symbolId = id ?? "";
  }
  symbolId = "";
  symbolType = () => UnknownType.Instance;
  symbolScope = SymbolScope.unknown;

  name = "Unknown Symbol";
}
