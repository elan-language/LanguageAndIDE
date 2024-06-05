import { SymbolType } from "../interfaces/symbol-type";
import { AbstractDictionaryType } from "./abstract-dictionary-type";

export class ImmutableDictionaryType extends AbstractDictionaryType implements SymbolType {
  constructor(keyType: SymbolType, valueType: SymbolType) {
    super(keyType, valueType);
  }

  isImmutable = true;

  get name() {
    return `ImmutableDictionary <${this.keyType.name},${this.valueType.name}>`;
  }

  toString(): string {
    return "ImmutableDictionary";
  }
}
