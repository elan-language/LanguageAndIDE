import { SymbolType } from "../interfaces/symbol-type";
import { isAssignableFrom } from "./symbol-helpers";

export class EnumType implements SymbolType {
  constructor(public readonly name: string) {}
  isImmutable = true;

  get initialValue() {
    return `${this.name}._default`;
  }

  toString() {
    return `Enum ${this.name}`;
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    return isAssignableFrom(this, otherType);
  }
}
