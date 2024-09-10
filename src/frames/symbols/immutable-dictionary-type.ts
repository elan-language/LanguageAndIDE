import { SymbolType } from "../interfaces/symbol-type";
import { AbstractDictionaryType } from "./abstract-dictionary-type";

export class ImmutableDictionaryType extends AbstractDictionaryType implements SymbolType {
  constructor(keyType: SymbolType, valueType: SymbolType) {
    super(keyType, valueType);
  }

  initialValue = "system.emptyImmutableDictionary()";

  isImmutable = true;

  factoryName = "system.immutableDictionary";

  get name() {
    return `ImmutableDictionary <${this.keyType.name},${this.valueType.name}>`;
  }

  toString(): string {
    return "ImmutableDictionary";
  }
}
