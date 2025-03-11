import { IterableSymbolType } from "../interfaces/iterable-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";

export class StringType implements IterableSymbolType {
  private constructor() {}
  isIterable = true;

  get ofType() {
    return StringType.Instance;
  }

  initialValue = '""';

  isImmutable = true;

  isIndexable = true;

  isDoubleIndexable = false;

  static Instance: SymbolType = new StringType();

  name = "String";

  toString(): string {
    return `String`;
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    return otherType instanceof StringType;
  }
}
