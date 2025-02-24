import { SymbolType } from "../interfaces/symbol-type";
import { isAssignableFrom } from "./symbol-helpers";

export class BooleanType implements SymbolType {
  private constructor() {}
  isImmutable = true;

  initialValue = "false";

  static Instance: SymbolType = new BooleanType();

  name = "Boolean";

  toString(): string {
    return "Boolean";
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    return isAssignableFrom(this, otherType);
  }
}
