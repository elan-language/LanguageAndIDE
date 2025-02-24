import { IterableSymbolType } from "../interfaces/iterable-symbol-type";
import { ReifyableSymbolType } from "../interfaces/reifyable-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";
import { isAssignableFrom, isReifyableSymbolType } from "./symbol-helpers";
import { UnknownType } from "./unknown-type";

export class IterableType implements IterableSymbolType, ReifyableSymbolType {
  constructor(public readonly ofType: SymbolType) {}
  isIterable = true;

  initialValue = "system.emptyIter()";

  isImmutable = true;

  get name() {
    return `Iterable<of ${this.ofType.name}>`;
  }

  toString(): string {
    return "Iterable";
  }

  reify(gts: SymbolType[]): ReifyableSymbolType {
    if (isReifyableSymbolType(this.ofType)) {
      return new IterableType(this.ofType.reify(gts));
    }

    const gt = gts && gts.length >= 1 ? gts[0] : UnknownType.Instance;

    return new IterableType(gt);
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    return isAssignableFrom(this, otherType);
  }
}
