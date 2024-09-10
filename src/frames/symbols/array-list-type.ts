import { IterableSymbolType } from "../interfaces/iterable-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";
import { AbstractListType } from "./abstract-list-type";

export class ArrayListType extends AbstractListType implements IterableSymbolType {
  constructor(ofType: SymbolType) {
    super(ofType);
  }

  isImmutable = false;

  initialValue = "system.emptyArrayList()";

  factoryName = "system.array";

  get name() {
    return `ArrayList <${this.ofType.name}>`;
  }

  toString(): string {
    return `ArrayList`;
  }
}
