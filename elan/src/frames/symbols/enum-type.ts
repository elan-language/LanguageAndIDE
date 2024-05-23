import { SymbolType } from "../interfaces/symbol-type";

export class EnumType implements SymbolType {
  constructor(public readonly name: string) {}
  isImmutable = true;

  toString() {
    return `Enum ${this.name}`;
  }
}
