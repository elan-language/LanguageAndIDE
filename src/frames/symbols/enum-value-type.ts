import { SymbolType } from "../interfaces/symbol-type";

export class EnumValueType implements SymbolType {
  constructor(
    public readonly owner: string,
    public readonly name: string,
  ) {}
  isImmutable = true;

  initialValue = "";

  toString() {
    return `${this.owner}.${this.name}`;
  }

  isAssignableFrom(_otherType: SymbolType): boolean {
    throw new Error("Method not implemented.");
  }
}
