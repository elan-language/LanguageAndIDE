import { GenericSymbolType } from "../interfaces/generic-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";

export class StringType implements GenericSymbolType {
  private constructor() {}

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
}
