import { SymbolType } from "../interfaces/symbol-type";
import { immutableTypeOptions } from "../interfaces/type-options";

export class IntType implements SymbolType {
  private constructor() {}
  initialValue = "0";

  classOptions = immutableTypeOptions;

  static Instance: SymbolType = new IntType();

  name = "Int";

  toString(): string {
    return "Int";
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    return otherType instanceof IntType;
  }
}
