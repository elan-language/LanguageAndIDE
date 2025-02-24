import { IterableSymbolType } from "../interfaces/iterable-symbol-type";
import { ReifyableSymbolType } from "../interfaces/reifyable-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";
import { AbstractListType } from "./abstract-list-type";
import { isAssignableFrom, isReifyableSymbolType } from "./symbol-helpers";
import { UnknownType } from "./unknown-type";

export class ListType extends AbstractListType implements IterableSymbolType, ReifyableSymbolType {
  constructor(ofType: SymbolType) {
    super(ofType);
  }

  initialValue = "system.emptyImmutableList()";

  factoryName = "system.list";

  isImmutable = true;

  get name() {
    return `List<of ${this.ofType.name}>`;
  }

  toString(): string {
    return `List`;
  }

  reify(gts: SymbolType[]): ReifyableSymbolType {
    if (isReifyableSymbolType(this.ofType)) {
      return new ListType(this.ofType.reify(gts));
    }

    const gt = gts && gts.length >= 1 ? gts[0] : UnknownType.Instance;

    return new ListType(gt);
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    return isAssignableFrom(this, otherType);
  }
}
