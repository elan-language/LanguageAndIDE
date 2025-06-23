import { ElanSymbol } from "../frame-interfaces/elan-symbol";
import { SymbolType } from "../frame-interfaces/symbol-type";

export class DuplicateSymbol implements ElanSymbol {
  constructor(public readonly duplicates: ElanSymbol[]) {}
  get symbolId() {
    return this.duplicates[0].symbolId;
  }

  symbolType(): SymbolType {
    return this.duplicates[0].symbolType();
  }

  get symbolScope() {
    return this.duplicates[0].symbolScope;
  }

  name = "Duplicate Symbol";
}
