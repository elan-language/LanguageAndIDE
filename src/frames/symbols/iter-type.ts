import { IterableSymbolType } from "../interfaces/iterable-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";

export class IterType implements IterableSymbolType {
  constructor(public readonly ofType: SymbolType) {}
  isIterable = true;

  initialValue = "system.emptyIter()";

  isImmutable = true;

  get name() {
    return `Iterable <${this.ofType.name}>`;
  }

  toString(): string {
    return `Iterable<of ${this.ofType.name}>`;
  }
}
