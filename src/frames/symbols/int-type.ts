import { SymbolType } from "../compiler-interfaces/symbol-type";
import { immutableTypeOptions } from "../frame-interfaces/type-options";
import { IntName } from "./elan-type-names";

export class IntType implements SymbolType {
  private constructor() {}
  initialValue = "0";

  typeOptions = immutableTypeOptions;

  static Instance: SymbolType = new IntType();

  name = IntName;

  toString(): string {
    return this.name;
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    return otherType instanceof IntType;
  }
}
