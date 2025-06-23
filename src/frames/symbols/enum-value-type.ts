import { SymbolType } from "../compiler-interfaces/symbol-type";
import { immutableTypeOptions } from "../frame-interfaces/type-options";

export class EnumValueType implements SymbolType {
  constructor(
    public readonly owner: string,
    public readonly name: string,
  ) {}
  typeOptions = immutableTypeOptions;

  initialValue = "";

  toString() {
    return `${this.owner}.${this.name}`;
  }

  isAssignableFrom(_otherType: SymbolType): boolean {
    return false;
  }
}
