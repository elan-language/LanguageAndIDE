import { SymbolType } from "../interfaces/symbol-type";

export class RegExType implements SymbolType {
  private constructor() {}

  initialValue = "//";

  isImmutable = true;

  static Instance: SymbolType = new RegExType();

  name = "RegEx";

  toString(): string {
    return `RegEx`;
  }
}
