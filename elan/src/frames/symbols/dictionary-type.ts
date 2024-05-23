import { SymbolType } from "../interfaces/symbol-type";

export class DictionaryType implements SymbolType {
  constructor(
    public readonly keyType: SymbolType,
    public readonly valueType: SymbolType,
    public readonly isImmutable: boolean
  ) {
    this.type = isImmutable ? "ImmutableDictionary" : "Dictionary";
  }

  type : string;
 
  get name() {
    return `${this.type} <${this.keyType.name},${this.valueType.name}>`;
  }

  toString(): string {
    return this.type;
  }
}
