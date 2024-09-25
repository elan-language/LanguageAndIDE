import { ElanSymbol } from "../interfaces/elan-symbol";
import { SymbolType } from "../interfaces/symbol-type";
import { Transforms } from "../syntax-nodes/transforms";

export class DuplicateSymbol implements ElanSymbol {
  constructor(public readonly duplicates: ElanSymbol[]) {}
  get symbolId() {
    return this.duplicates[0].symbolId;
  }

  symbolType(transforms?: Transforms): SymbolType {
    return this.duplicates[0].symbolType(transforms);
  }

  get symbolScope() {
    return this.duplicates[0].symbolScope;
  }

  name = "Duplicate Symbol";
}
