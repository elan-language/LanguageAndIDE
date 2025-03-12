import { SymbolType } from "../interfaces/symbol-type";
import { isNumber } from "./symbol-helpers";

export class FloatType implements SymbolType {
  private constructor() {}
  initialValue = "0";

  isImmutable = true;

  isIndexable = false;
  isDoubleIndexable = false;
  isIterable = false;

  static Instance: SymbolType = new FloatType();
  name = "Float";

  toString(): string {
    return `Float`;
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    return isNumber(otherType);
  }
}
