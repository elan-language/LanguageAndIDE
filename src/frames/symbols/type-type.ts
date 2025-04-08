import { SymbolType } from "../interfaces/symbol-type";
import { immutableTypeOptions } from "../interfaces/type-options";
import { TypeName } from "./elan-type-names";

export class TypeType implements SymbolType {
  private constructor() {}

  typeOptions = immutableTypeOptions;

  initialValue = "false";

  name = TypeName;

  toString(): string {
    return this.name;
  }

  static Instance: SymbolType = new TypeType();

  isAssignableFrom(otherType: SymbolType): boolean {
    return otherType instanceof TypeType;
  }
}
