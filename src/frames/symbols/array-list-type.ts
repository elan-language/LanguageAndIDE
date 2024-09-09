import { IterableSymbolType } from "../interfaces/iterable-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";

export class ArrayListType implements IterableSymbolType {
  constructor(public readonly ofType: SymbolType) {}
  isIterable = true;
  isImmutable = false;

  initialValue = "system.emptyArrayList()";

  get name() {
    return `ArrayList <${this.ofType.name}>`;
  }

  toString(): string {
    return `ArrayList`;
  }
}
