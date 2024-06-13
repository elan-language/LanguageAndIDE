import { GenericSymbolType } from "../interfaces/generic-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";

export class ImmutableListType implements GenericSymbolType {
  constructor(public readonly ofType: SymbolType) {}
  initialValue = "system.emptyImmutableList()";

  isImmutable = true;

  get name() {
    return `ImmutableList <${this.ofType.name}>`;
  }
  toString(): string {
    return `ImmutableList`;
  }
}
