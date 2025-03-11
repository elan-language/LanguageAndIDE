import { SymbolType } from "../interfaces/symbol-type";

export class GenericParameterType implements SymbolType {
  constructor(public id: string) {}

  isImmutable = false;

  isIndexable = false;
  isDoubleIndexable = false;

  initialValue = "";

  get name() {
    return `Generic Parameter ${this.id}`;
  }

  toString() {
    return this.name;
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    if (otherType instanceof GenericParameterType) {
      return this.name === otherType.name;
    }
    return false;
  }
}
