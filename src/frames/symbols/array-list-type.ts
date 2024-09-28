import { IterableSymbolType } from "../interfaces/iterable-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";
import { AbstractListType } from "./abstract-list-type";

export class ArrayType extends AbstractListType implements IterableSymbolType {
  constructor(ofType: SymbolType) {
    super(ofType);
  }

  isImmutable = false;

  initialValue = "system.emptyArray()";

  factoryName = "system.array";

  get name() {
    return `[${this.ofType.name}]`;
  }

  toString(): string {
    return `Array`;
  }
}
