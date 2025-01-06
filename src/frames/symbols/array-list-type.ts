import { IterableSymbolType } from "../interfaces/iterable-symbol-type";
import { ReifyableSymbolType } from "../interfaces/reifyable-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";
import { AbstractListType } from "./abstract-list-type";
import { isReifyableSymbolType } from "./symbol-helpers";

export class ArrayType extends AbstractListType implements IterableSymbolType, ReifyableSymbolType {
  constructor(ofType: SymbolType) {
    super(ofType);
  }

  isImmutable = false;

  initialValue = "system.emptyArray()";

  factoryName = "system.array";

  get name() {
    return `Array<of ${this.ofType.name}>`;
  }

  toString(): string {
    return `Array`;
  }

  reify(gt: SymbolType[]): ReifyableSymbolType {
    if (isReifyableSymbolType(this.ofType)) {
      return new ArrayType(this.ofType.reify(gt));
    }

    return new ArrayType(gt[0]);
  }
}
