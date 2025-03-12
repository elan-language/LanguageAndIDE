import { DictionarySymbolType } from "../interfaces/dictionary-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";
import { isInvariantType } from "./symbol-helpers";

export class DictionaryImmutableType implements DictionarySymbolType {
  constructor(
    public readonly keyType: SymbolType,
    public readonly valueType: SymbolType,
  ) {}

  initialValue = "system.emptyDictionaryImmutable()";

  get classOptions() {
    return {
      isImmutable: true,
      isAbstract: false,
      isIndexable: true,
      isDoubleIndexable: false,
      isIterable: false,
    }
  }

  factoryName = "system.dictionaryImmutable";

  get name() {
    return `DictionaryImmutable<of ${this.keyType.name}, ${this.valueType.name}>`;
  }

  toString(): string {
    return "DictionaryImmutable";
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    if (otherType instanceof DictionaryImmutableType) {
      return (
        isInvariantType(this.keyType, otherType.keyType, true) &&
        isInvariantType(this.valueType, otherType.valueType, true)
      );
    }

    return false;
  }
}
