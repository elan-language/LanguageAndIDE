import { DictionarySymbolType } from "../interfaces/dictionary-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";
import { isAssignableFrom } from "./symbol-helpers";

export class AbstractDictionaryType implements DictionarySymbolType {
  constructor(
    public readonly keyType: SymbolType,
    public readonly valueType: SymbolType,
  ) {}
  isAssignableFrom(otherType: SymbolType): boolean {
    return isAssignableFrom(this, otherType);
  }
  isImmutable = false;

  initialValue = "";

  factoryName = "";

  get name() {
    return `AbstractDictionary <${this.keyType.name},${this.valueType.name}>`;
  }

  toString(): string {
    return "AbstractDictionary";
  }
}
