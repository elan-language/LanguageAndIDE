import { SymbolType } from "../interfaces/symbol-type";
import { isAssignableFrom } from "./symbol-helpers";

export class GenericParameterType implements SymbolType {
  constructor(public id: string) {}

  isImmutable = false;

  initialValue = "";

  get name() {
    return `Generic Parameter ${this.id}`;
  }

  toString() {
    return this.name;
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    return isAssignableFrom(this, otherType);
  }
}
