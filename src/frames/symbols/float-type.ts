import { SymbolType } from "../interfaces/symbol-type";
import { isAssignableFrom } from "./symbol-helpers";

export class FloatType implements SymbolType {
  private constructor() {}
  initialValue = "0";

  isImmutable = true;

  static Instance: SymbolType = new FloatType();
  name = "Float";

  toString(): string {
    return `Float`;
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    return isAssignableFrom(this, otherType);
  }
}
