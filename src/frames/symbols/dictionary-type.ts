import { SymbolType } from "../interfaces/symbol-type";
import { AbstractDictionaryType } from "./abstract-dictionary-type";

export class DictionaryType extends AbstractDictionaryType implements SymbolType {
  constructor(keyType: SymbolType, valueType: SymbolType) {
    super(keyType, valueType);
  }
  isImmutable = false;

  initialValue = "system.emptyDictionary()";

  factoryName = "system.dictionary";

  get name() {
    return `Dictionary <${this.keyType.name},${this.valueType.name}>`;
  }

  toString(): string {
    return "Dictionary";
  }
}
