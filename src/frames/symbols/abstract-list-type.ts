import { IterableSymbolType } from "../interfaces/iterable-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";

export class AbstractListType implements IterableSymbolType {
  constructor(public readonly ofType: SymbolType) {}
  isIterable = true;

  isImmutable = false;

  initialValue = "";

  factoryName = "";

  get name() {
    return `AbstractList <${this.ofType.name}>`;
  }

  toString(): string {
    return "AbstractList";
  }
}
