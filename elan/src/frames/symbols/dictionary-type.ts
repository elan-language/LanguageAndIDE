import { SymbolType } from "../interfaces/symbol-type";

export class DictionaryType implements SymbolType {
  constructor(
    public readonly keyType: SymbolType,
    public readonly valueType: SymbolType,
  ) {}

  get name() {
    return `Dictionary <${this.keyType.name},${this.valueType.name}>`;
  }

  toString(): string {
    return `Dictionary`;
  }
}
