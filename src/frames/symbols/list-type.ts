import { IterableSymbolType } from "../interfaces/iterable-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";
import { AbstractListType } from "./abstract-list-type";

export class ListType extends AbstractListType implements IterableSymbolType {
  constructor(ofType: SymbolType) {
    super(ofType);
  }

  initialValue = "system.emptyImmutableList()";

  factoryName = "system.list";

  isImmutable = true;

  get name() {
    return `List <${this.ofType.name}>`;
  }
  toString(): string {
    return `List`;
  }
}
