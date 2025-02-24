import { SymbolType } from "../interfaces/symbol-type";
import { isAssignableFrom } from "./symbol-helpers";

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

  isAssignableFrom(otherType: SymbolType): boolean {
    return isAssignableFrom(this, otherType);
  }
}
