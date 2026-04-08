import { SymbolType } from "../compiler-interfaces/symbol-type";
import { immutableTypeOptions } from "../compiler-interfaces/type-options";
import { AnyEnumName } from "./elan-type-names";
import { EnumType } from "./enum-type";

export class AnyEnumType implements SymbolType {
  private constructor() {}

  initialValue = "";

  typeOptions = immutableTypeOptions;

  static Instance: SymbolType = new AnyEnumType();

  name = AnyEnumName;

  toString(): string {
    return this.name;
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    if (otherType instanceof EnumType) {
      return true;
    }

    return false;
  }
}
