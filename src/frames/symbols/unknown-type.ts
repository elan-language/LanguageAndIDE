import { SymbolType } from "../frame-interfaces/symbol-type";
import { immutableTypeOptions } from "../frame-interfaces/type-options";

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
