import { SymbolType } from "../compiler-interfaces/symbol-type";
import { immutableTypeOptions } from "../compiler-interfaces/type-options";
import { AnyName } from "./elan-type-names";

export class AnyType implements SymbolType {
  private constructor() {}

  initialValue = "";

  typeOptions = immutableTypeOptions;

  static Instance: SymbolType = new AnyType();

  name = AnyName;

  toString(): string {
    return this.name;
  }

  isAssignableFrom(_otherType: SymbolType): boolean {
    return true;
  }
}
