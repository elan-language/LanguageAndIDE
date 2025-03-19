import { SymbolType } from "../interfaces/symbol-type";
import { immutableTypeOptions } from "../interfaces/type-options";
import { FloatName } from "./elan-type-names";
import { isNumber } from "./symbol-helpers";

export class FloatType implements SymbolType {
  private constructor() {}
  initialValue = "0";

  typeOptions = immutableTypeOptions;

  static Instance: SymbolType = new FloatType();
  name = FloatName;

  toString(): string {
    return `Float`;
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    return isNumber(otherType);
  }
}
