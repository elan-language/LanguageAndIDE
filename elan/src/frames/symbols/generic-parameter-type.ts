import { SymbolType } from "../interfaces/symbol-type";

export class GenericParameterType implements SymbolType {
  constructor(public id: string) {}

  isImmutable = false;

  get name() {
    return `Generic Parameter ${this.id}`;
  }
}
