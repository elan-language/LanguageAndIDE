import { SymbolType } from "../compiler-interfaces/symbol-type";
import { immutableTypeOptions } from "../compiler-interfaces/type-options";

export class UnknownType implements SymbolType {
  private constructor() {}
  initialValue = "";

  typeOptions = immutableTypeOptions;

  static Instance: SymbolType = new UnknownType();

  name = "Unknown";

  toString(): string {
    return this.name;
  }

  isAssignableFrom(_otherType: SymbolType): boolean {
    return true;
  }
}
