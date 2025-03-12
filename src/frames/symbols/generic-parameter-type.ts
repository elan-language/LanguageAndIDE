import { SymbolType } from "../interfaces/symbol-type";
import { noTypeOptions } from "../interfaces/type-options";

export class GenericParameterType implements SymbolType {
  constructor(public id: string) {}

  classOptions = noTypeOptions;

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
