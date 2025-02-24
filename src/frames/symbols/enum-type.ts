import { SymbolType } from "../interfaces/symbol-type";

export class EnumType implements SymbolType {
  constructor(public readonly name: string) {}
  isImmutable = true;

  get initialValue() {
    return `${this.name}._default`;
  }

  toString() {
    return `Enum ${this.name}`;
  }

  isAssignableFrom(_otherType: SymbolType): boolean {
    throw new Error("Method not implemented.");
  }
}
