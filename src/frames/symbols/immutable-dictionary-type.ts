import { DictionarySymbolType } from "../interfaces/dictionary-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";

export class ImmutableDictionaryType implements DictionarySymbolType {
  constructor(
    public readonly keyType: SymbolType,
    public readonly valueType: SymbolType,
  ) {}

  initialValue = "system.emptyImmutableDictionary()";

  isImmutable = true;

  factoryName = "system.immutableDictionary";

  get name() {
    return `{${this.keyType.name}:${this.valueType.name}}`;
  }

  toString(): string {
    return "ImmutableDictionary";
  }
}
