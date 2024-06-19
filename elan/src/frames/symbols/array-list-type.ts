import { GenericSymbolType } from "../interfaces/generic-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";

export class ArrayListType implements GenericSymbolType {
  constructor(public readonly ofType: SymbolType) {}
  isImmutable = false;

  initialValue = "system.emptyArrayList()";

  get name() {
    return `ArrayList <${this.ofType.name}>`;
  }

  toString(): string {
    return `ArrayList`;
  }
}
