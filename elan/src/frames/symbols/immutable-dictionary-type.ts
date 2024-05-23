import { SymbolType } from "../interfaces/symbol-type";

export class ImmutableDictionaryType implements SymbolType {
  constructor(
    public readonly keyType: SymbolType,
    public readonly valueType: SymbolType,
  ) {}

  isImmutable = true;

  get name() {
    return `ImmutableDictionary <${this.keyType.name},${this.valueType.name}>`;
  }

  toString(): string {
    return `ImmutableDictionary`;
  }
}
