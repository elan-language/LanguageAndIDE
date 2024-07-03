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
}
