import { DictionarySymbolType } from "../interfaces/dictionary-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";
import { isInvariantType } from "./symbol-helpers";

export class DictionaryType implements DictionarySymbolType {
  constructor(
    public readonly keyType: SymbolType,
    public readonly valueType: SymbolType,
  ) {}
  isImmutable = false;

  initialValue = "system.emptyDictionary()";

  isIndexable = true;

  isDoubleIndexable = false;
  isIterable = false;

  factoryName = "system.dictionary";

  get name() {
    return `Dictionary<of ${this.keyType.name}, ${this.valueType.name}>`;
  }

  toString(): string {
    return "Dictionary";
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    if (otherType instanceof DictionaryType) {
      return (
        isInvariantType(this.keyType, otherType.keyType, true) &&
        isInvariantType(this.valueType, otherType.valueType, true)
      );
    }

    return false;
  }
}
