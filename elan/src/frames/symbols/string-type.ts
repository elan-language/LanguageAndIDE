import { SymbolType } from "../interfaces/symbol-type";

export class StringType implements SymbolType {
  private constructor() {}

  initialValue = '""';

  isImmutable = true;

  static Instance: SymbolType = new StringType();

  name = "String";

  toString(): string {
    return `String`;
  }
}
