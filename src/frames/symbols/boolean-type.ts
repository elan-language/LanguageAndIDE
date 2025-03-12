import { SymbolType } from "../interfaces/symbol-type";
import { immutableTypeOptions } from "../interfaces/type-options";

export class BooleanType implements SymbolType {
  private constructor() {}
  
  classOptions = immutableTypeOptions;

  initialValue = "false";

  static Instance: SymbolType = new BooleanType();

  name = "Boolean";

  toString(): string {
    return "Boolean";
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    return otherType instanceof BooleanType;
  }
}
