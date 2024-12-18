import { DictionarySymbolType } from "../interfaces/dictionary-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";

export class DictionaryType implements DictionarySymbolType {
  constructor(
    public readonly keyType: SymbolType,
    public readonly valueType: SymbolType,
  ) {}
  isImmutable = false;

  initialValue = "system.emptyDictionary()";

  factoryName = "system.dictionary";

  get name() {
    return `Dictionary<of ${this.keyType.name}, ${this.valueType.name}>`;
  }

  toString(): string {
    return "Dictionary";
  }
}
