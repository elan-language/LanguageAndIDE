import { SymbolType } from "../interfaces/symbol-type";

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

  isAssignableFrom(_otherType: SymbolType): boolean {
    throw new Error("Method not implemented.");
  }
}
