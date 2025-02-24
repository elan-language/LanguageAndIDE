import { DictionarySymbolType } from "../interfaces/dictionary-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";
import { isAnyDictionaryType, isInvariantType } from "./symbol-helpers";

export class AbstractDictionaryType implements DictionarySymbolType {
  constructor(
    public readonly keyType: SymbolType,
    public readonly valueType: SymbolType,
  ) {}

  isImmutable = false;

  initialValue = "";

  factoryName = "";

  get name() {
    return `AbstractDictionary <${this.keyType.name},${this.valueType.name}>`;
  }

  toString(): string {
    return "AbstractDictionary";
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    if (isAnyDictionaryType(otherType)) {
      return (
        isInvariantType(this.keyType, otherType.keyType, true) &&
        isInvariantType(this.valueType, otherType.valueType, true)
      );
    }

    return false;
  }
}
