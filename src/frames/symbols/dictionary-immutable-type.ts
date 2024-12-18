import { DictionarySymbolType } from "../interfaces/dictionary-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";

export class DictionaryImmutableType implements DictionarySymbolType {
  constructor(
    public readonly keyType: SymbolType,
    public readonly valueType: SymbolType,
  ) {}

  initialValue = "system.emptyDictionaryImmutable()";

  isImmutable = true;

  factoryName = "system.dictionaryImmutable";

  get name() {
    return `DictionaryImmutable<of ${this.keyType.name}, ${this.valueType.name}>`;
  }

  toString(): string {
    return "DictionaryImmutable";
  }
}
