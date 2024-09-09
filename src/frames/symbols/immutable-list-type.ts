import { IterableSymbolType } from "../interfaces/iterable-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";

export class ImmutableListType implements IterableSymbolType {
  constructor(public readonly ofType: SymbolType) {}
  isIterable = true;
  initialValue = "system.emptyImmutableList()";

  isImmutable = true;

  get name() {
    return `ImmutableList <${this.ofType.name}>`;
  }
  toString(): string {
    return `ImmutableList`;
  }
}
