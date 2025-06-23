import { SymbolType } from "../compiler-interfaces/symbol-type";
import { immutableTypeOptions } from "../frame-interfaces/type-options";
import { FloatName } from "./elan-type-names";
import { IntType } from "./int-type";

export class FloatType implements SymbolType {
  private constructor() {}
  initialValue = "0";

  typeOptions = immutableTypeOptions;

  static Instance: SymbolType = new FloatType();
  name = FloatName;

  toString(): string {
    return this.name;
  }

  isNumber(st: SymbolType) {
    return st instanceof IntType || st instanceof FloatType;
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    return this.isNumber(otherType);
  }
}
