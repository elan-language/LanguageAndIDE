import { SymbolType } from "../interfaces/symbol-type";

export class EnumValueType implements SymbolType {
  constructor(
    public readonly owner: string,
    public readonly name: string,
  ) {}
  isImmutable = true;

  isIndexable = false;
  isDoubleIndexable = false;
  isIterable = false;

  initialValue = "";

  toString() {
    return `${this.owner}.${this.name}`;
  }

  isAssignableFrom(_otherType: SymbolType): boolean {
    return false;
  }
}
