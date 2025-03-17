import { SymbolType } from "../interfaces/symbol-type";
import { immutableTypeOptions } from "../interfaces/type-options";
import { isNumber } from "./symbol-helpers";

export class FloatType implements SymbolType {
  private constructor() {}
  initialValue = "0";

  typeOptions = immutableTypeOptions;

  static Instance: SymbolType = new FloatType();
  name = "Float";

  toString(): string {
    return `Float`;
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    return isNumber(otherType);
  }
}
