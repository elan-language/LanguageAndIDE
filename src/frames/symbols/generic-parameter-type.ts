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
}
