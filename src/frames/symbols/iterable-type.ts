import { IterableSymbolType } from "../interfaces/iterable-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";

export class IterableType implements IterableSymbolType {
  constructor(public readonly ofType: SymbolType) {}
  isIterable = true;

  initialValue = "system.emptyIter()";

  isImmutable = true;

  get name() {
    return `Iterable<of ${this.ofType.name}>`;
  }

  toString(): string {
    return this.name;
  }
}
