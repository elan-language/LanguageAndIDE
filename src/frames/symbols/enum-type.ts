import { SymbolType } from "../interfaces/symbol-type";

export class EnumType implements SymbolType {
  constructor(public readonly name: string) {}
  isImmutable = true;

  isIndexable = false;

  get initialValue() {
    return `${this.name}._default`;
  }

  toString() {
    return `Enum ${this.name}`;
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    if (otherType instanceof EnumType) {
      return this.name === otherType.name;
    }

    return false;
  }
}
