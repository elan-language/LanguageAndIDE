import { ReifyableSymbolType } from "../interfaces/reifyable-symbol-type";
import { SymbolType } from "../interfaces/symbol-type";
import { immutableTypeOptions } from "../interfaces/type-options";
import { TypeName } from "./elan-type-names";
import { UnknownType } from "./unknown-type";

export class TypeType implements SymbolType, ReifyableSymbolType {
  constructor(public readonly ofType: SymbolType) {}

  typeOptions = immutableTypeOptions;

  initialValue = `"${UnknownType.Instance.name}"`;

  name = TypeName;

  toString(): string {
    return this.name;
  }

  get ofTypes() {
    return [this.ofType];
  }

  reify(gts: SymbolType[]): ReifyableSymbolType {
    if (gts.length === 1) {
      return new TypeType(gts[0]);
    }
    return this;
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    return otherType instanceof TypeType;
  }
}
