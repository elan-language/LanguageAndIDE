import { IterableSymbolType } from "../interfaces/iterable-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";
import { isAssignableFrom } from "./symbol-helpers";

export class StringType implements IterableSymbolType {
  private constructor() {}
  isIterable = true;

  get ofType() {
    return StringType.Instance;
  }

  initialValue = '""';

  isImmutable = true;

  static Instance: SymbolType = new StringType();

  name = "String";

  toString(): string {
    return `String`;
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    return isAssignableFrom(this, otherType);
  }
}
