import { SymbolType } from "../compiler-interfaces/symbol-type";
import { immutableTypeOptions } from "../compiler-interfaces/type-options";
import { RegExpName } from "./elan-type-names";

export class RegExpType implements SymbolType {
  private constructor() {}

  initialValue = "system.emptyRegExp()";

  typeOptions = immutableTypeOptions;

  static Instance: SymbolType = new RegExpType();

  name = RegExpName;

  toString(): string {
    return this.name;
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    return otherType instanceof RegExpType;
  }
}
