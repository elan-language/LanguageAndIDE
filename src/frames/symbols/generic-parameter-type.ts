import { SymbolType } from "../interfaces/symbol-type";
import { noTypeOptions } from "../interfaces/type-options";

export class GenericParameterType implements SymbolType {
  constructor(
    public id: string,
    public constraint?: SymbolType,
  ) {}

  typeOptions = noTypeOptions;

  initialValue = "";

  get name() {
    const c = this.constraint ? `(${this.constraint.name})` : "";
    return `Generic Parameter ${this.id}${c}`;
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
