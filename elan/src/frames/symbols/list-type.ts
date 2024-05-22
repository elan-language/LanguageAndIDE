import { GenericSymbolType } from "../interfaces/generic-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";

export class ListType implements GenericSymbolType {
  constructor(public readonly ofType: SymbolType) {}

  get name() {
    return `List <${this.ofType.name}>`;
  }
  toString(): string {
    return `List<of ${this.ofType.name}>`;
  }
}
