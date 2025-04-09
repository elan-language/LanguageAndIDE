import { SymbolType } from "../interfaces/symbol-type";
import { immutableTypeOptions } from "../interfaces/type-options";
import { TypeName } from "./elan-type-names";

export class TypeType implements SymbolType {
  constructor(public readonly ofType: SymbolType) {}

  typeOptions = immutableTypeOptions;

  initialValue = "false";

  name = TypeName;

  toString(): string {
    return this.name;
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    return otherType instanceof TypeType;
  }
}
