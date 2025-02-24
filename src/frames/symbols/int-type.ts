import { SymbolType } from "../interfaces/symbol-type";
import { isAssignableFrom } from "./symbol-helpers";

export class IntType implements SymbolType {
  private constructor() {}
  initialValue = "0";

  isImmutable = true;

  static Instance: SymbolType = new IntType();

  name = "Int";

  toString(): string {
    return "Int";
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    return isAssignableFrom(this, otherType);
  }
}
