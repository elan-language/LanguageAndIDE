import { SymbolType } from "../interfaces/symbol-type";

export class AbstractDictionaryType implements SymbolType {
  constructor(
    public readonly keyType: SymbolType,
    public readonly valueType: SymbolType,
  ) {}
  isImmutable = false;

  get name() {
    return `AbstractDictionary <${this.keyType.name},${this.valueType.name}>`;
  }

  toString(): string {
    return "AbstractDictionary";
  }
}
