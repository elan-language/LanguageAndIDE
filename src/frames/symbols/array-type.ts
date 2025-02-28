import { IterableSymbolType } from "../interfaces/iterable-symbol-type";
import { ReifyableSymbolType } from "../interfaces/reifyable-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";
import { AbstractListType } from "./abstract-list-type";
import { isInvariantType, isReifyableSymbolType } from "./symbol-helpers";
import { UnknownType } from "./unknown-type";

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

  reify(gts: SymbolType[]): ReifyableSymbolType {
    if (isReifyableSymbolType(this.ofType)) {
      return new ArrayType(this.ofType.reify(gts));
    }

    const gt = gts && gts.length >= 1 ? gts[0] : UnknownType.Instance;

    return new ArrayType(gt);
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    if (otherType instanceof ArrayType) {
      return isInvariantType(this.ofType, otherType.ofType, true);
    }
    return false;
  }
}
