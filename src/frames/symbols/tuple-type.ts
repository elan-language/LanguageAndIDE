import { SymbolType } from "../compiler-interfaces/symbol-type";
import { immutableTypeOptions } from "../compiler-interfaces/type-options";

export class TupleType implements SymbolType {
  constructor(public readonly ofTypes: SymbolType[]) {}

  typeOptions = immutableTypeOptions;

  get initialValue() {
    const init = this.ofTypes.map((t) => t.initialValue).join(", ");
    return `system.emptyTuple([${init}])`;
  }

  get name() {
    return `tuple(${this.ofTypes.map((t) => t.name).join(", ")})`;
  }

  toString(): string {
    return `tuple(${this.ofTypes.map((t) => t.name).join(", ")})`;
  }

  isAssignableFrom(otherType: SymbolType): boolean {
    if (otherType instanceof TupleType) {
      if (this.ofTypes.length !== otherType.ofTypes.length) {
        return false;
      }

      return this.ofTypes.map((t, i) => t.isAssignableFrom(otherType.ofTypes[i])).every((b) => b);
    }

    return false;
  }
}
